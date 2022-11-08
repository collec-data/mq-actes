import { inject, Injectable, InjectionToken } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Acte, Page, Pageable, SearchParams } from './models/model';
import { actes } from './models/model.examples';
import { delay } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { worker } from '../mocks/browser';

worker.start()

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
          total: actes.length,
          taille_page: params.lignes || 10,
          debut: params.debut || 0,
          items: actes
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
    return this.httpClient.get<Page<Acte>>(`${this.baseUrl}/actes`, {
      params: {
        query: params.query,
        ...params.date_debut && {date_debut: params.date_debut.toISOString()},
        ...params.date_fin && {date_fin: params.date_fin?.toISOString()},
        ...params.classifications?.size && {classifications: [...params.classifications].join(',')},
        ...params.types_actes?.size && {types_actes: [...params.types_actes].join(',')},
        debut: params.debut ?? 0,
        lignes: params.lignes ?? 10
      }
    });
  }

}
