import { Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ViewModel } from './models/acte.viewmodel';
import { actes } from './models/acte.viewmodel.examples';

import { delay } from 'rxjs/operators';

export interface SearchService {
  all(): Observable<ViewModel.Acte[]>
}

@Injectable()
export class FakeSearchService implements SearchService {

  all(): Observable<ViewModel.Acte[]> {
    let _actes = actes()

    return of(_actes)
      .pipe(delay(500))
  }

}

export const SEARCH_SERVICE_TOKEN = new InjectionToken<SearchService>('SearchService');