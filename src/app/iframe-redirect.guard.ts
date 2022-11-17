import { inject, Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { MARQUE_BLANCHE_URL } from './app-routes';

@Injectable({
  providedIn: 'root'
})
export class IFrameRedirectVersMarqueBlancheGuard implements CanLoad {
  private router = inject(Router);

  canLoad() {
    if (window.self === window.top) {
      // Si la page est affichée directement (= pas dans une iframe), on ne fait rien.
      return true;
    }

    // Sinon on redirige vers la marque blanche en conservant les paramètres query.

    const currentQueryParams = this.router.getCurrentNavigation()?.extractedUrl.queryParams;
    const currentFragment = this.router.getCurrentNavigation()?.extractedUrl.fragment ?? undefined;

    return this.router.createUrlTree(
      [MARQUE_BLANCHE_URL],
      {
        queryParams: currentQueryParams,
        fragment: currentFragment,
      }
    );
  }
}
