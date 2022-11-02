import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MARQUE_BLANCHE_URL } from './app-routes';

@Injectable({
  providedIn: 'root'
})
export class IFrameRedirectVersMarqueBlancheGuard implements CanLoad {

  constructor(private router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let currentQueryParams = this.router.getCurrentNavigation()?.extractedUrl.queryParams;
    let currentFragment = this.router.getCurrentNavigation()?.extractedUrl.fragment;
    currentFragment = (currentFragment == null) ? undefined : currentFragment;

    if (this.inIFrame()) {
      let urltree = this.router.createUrlTree(
        [MARQUE_BLANCHE_URL],
        {
          queryParams: currentQueryParams,
          fragment: currentFragment,
        }
      );
      return urltree;
    }

    return true;
  }

  inIFrame() {
    return window.self !== window.top
  }
}
