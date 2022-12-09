import { inject, Injectable, InjectionToken } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Acte, ActeBack, Annexe, Page, PageBack, SearchParams, thematiques, TypeActeCode } from './models/model';
import { actes } from './models/model.examples';
import { delay } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { getDateDebutPublicationsEnCours } from "./utils";
import { EnvService } from './env.service';

export const API_ACTES_ENDPOINT = new InjectionToken<string>('API_ACTES_ENDPOINT');
const NB_LIGNES = 10;

@Injectable()
export abstract class SearchService {
  abstract search(params: SearchParams): Observable<Page<Acte>>;
}

@Injectable()
export class FakeSearchService extends SearchService {

  private all(): Observable<Acte[]> {
    let _actes = actes()

    return of(_actes)
      .pipe(delay(500))
  }

  override search(params: SearchParams): Observable<Page<Acte>> {
    return this.all().pipe(
      map((actes) => {
        return ({
          nb_resultats: actes.length,
          resultats: actes
        });
      })
    );
  }

}

@Injectable()
export class HttpSearchService extends SearchService {

  private envService = inject(EnvService)
  private httpClient = inject(HttpClient);
  private endpoint_url = inject(API_ACTES_ENDPOINT)

  private baseUrl = `${this.envService.backend_url}/${this.endpoint_url}`;

  override search(params: SearchParams): Observable<Page<Acte>> {
    // On ajuste les dates de début et fin si le filtre sur les publications en cours est présent.
    const {date_debut, date_fin} = params.publications_en_cours
      ? {date_debut: getDateDebutPublicationsEnCours(), date_fin: undefined}
      : params;

    let query = params.query;

    if (params.thematique) {
      query = `${query} ${thematiques[params.thematique].keywords}`;
    }

    return this.httpClient.get<PageBack<ActeBack>>(`${this.baseUrl}/search`, {
      params: {
        query,
        ...params.siren && {siren: params.siren},
        ...date_debut && {date_debut: date_debut.toISOString()},
        ...date_fin && {date_fin: date_fin.toISOString()},
        ...params.classifications?.size && {classifications: [...params.classifications].join(',')},
        ...params.types_actes?.size && {types_actes: [...params.types_actes].join(',')},
        ...params.page_suivante && {page_suivante: params.page_suivante},
        lignes: NB_LIGNES,
      }
    }).pipe(
      map((pageBack): Page<Acte> => ({
        ...pageBack,
        resultats: pageBack.resultats.map((acteBack): Acte => {
          const {annexes, type, ...propsCommunes} = acteBack;
          const typeFront = `${acteBack.type}` as TypeActeCode;
          return {
            ...acteBack,
            type: typeFront,
            annexes: annexes.map((annexeBack, index): Annexe => ({
              ...propsCommunes,
              index_annexe: index,
              type: typeFront,
              ...annexeBack
            }))
          };
        })
      }))
    );
  }

}
