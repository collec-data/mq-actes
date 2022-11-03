import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Acte, Page, Pageable, SearchParams } from './models/model';
import { actes } from './models/model.examples';
import { delay } from 'rxjs/operators';

@Injectable()
export abstract class SearchService {
  abstract all(): Observable<Acte[]>;

  abstract search(params: SearchParams & Pageable): Observable<Page<Acte>>;
}

export class FakeSearchService extends SearchService {

  override all(): Observable<Acte[]> {
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
