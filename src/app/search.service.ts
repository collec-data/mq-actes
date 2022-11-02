import { Injectable, InjectionToken } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Acte, Page, SearchParams } from './models/model';
import { actes } from './models/model.examples';
import { delay } from 'rxjs/operators';

export interface SearchService {
  all(): Observable<Acte[]>;

  search(params: SearchParams): Observable<Page<Acte>>;
}

@Injectable()
export class FakeSearchService implements SearchService {

  all(): Observable<Acte[]> {
    let _actes = actes()

    return of(_actes)
      .pipe(delay(500))
  }

  search(params: SearchParams): Observable<Page<Acte>> {
    return EMPTY;
  }

}

export const SEARCH_SERVICE_TOKEN = new InjectionToken<SearchService>('SearchService');
