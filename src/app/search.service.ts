import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Acte, Page, SearchParams } from './models/model';
import { actes } from './models/model.examples';
import { delay } from 'rxjs/operators';

@Injectable()
export abstract class SearchService {
  abstract all(): Observable<Acte[]>;

  abstract search(params: SearchParams): Observable<Page<Acte>>;
}

export class FakeSearchService extends SearchService {

  override all(): Observable<Acte[]> {
    let _actes = actes()

    return of(_actes)
      .pipe(delay(500))
  }

  override search(params: SearchParams): Observable<Page<Acte>> {
    return EMPTY;
  }

}
