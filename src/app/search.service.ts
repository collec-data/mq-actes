import { inject, Injectable, InjectionToken } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Acte, ActeBack, Annexe, Page, Pageable, PageBack, SearchParams, TypeActeCode } from './models/model';
import { actes } from './models/model.examples';
import { delay } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

export const API_ACTES_URL = new InjectionToken<string>('API_ACTES_URL');

@Injectable()
export abstract class SearchService {
  abstract search(params: SearchParams & Pageable): Observable<Page<Acte>>;
}

@Injectable()
export class FakeSearchService extends SearchService {

  private all(): Observable<Acte[]> {
    let _actes = actes()

    return of(_actes)
      .pipe(delay(500))
  }

  override search(params: SearchParams & Pageable): Observable<Page<Acte>> {
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

  private httpClient = inject(HttpClient);
  private baseUrl = inject(API_ACTES_URL);

  override search(params: SearchParams & Pageable): Observable<Page<Acte>> {
    return this.httpClient.get<PageBack<ActeBack>>(`${this.baseUrl}/search`, {
      params: {
        query: params.query,
        ...params.date_debut && {date_debut: params.date_debut.toISOString()},
        ...params.date_fin && {date_fin: params.date_fin?.toISOString()},
        ...params.classifications?.size && {classifications: [...params.classifications].join(',')},
        ...params.types_actes?.size && {types_actes: [...params.types_actes].join(',')},
        ...params.page_suivante && {page_suivante: params.page_suivante},
        lignes: params.lignes,
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
