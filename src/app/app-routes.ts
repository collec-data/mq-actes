import { Routes } from '@angular/router';
import { IFrameRedirectVersMarqueBlancheGuard } from './iframe-redirect.guard';

export const APPLICATION_PATH = 'a'
export const APPLICATION_URL = `/${APPLICATION_PATH}`

export const MARQUE_BLANCHE_PATH = 'marque-blanche'
export const MARQUE_BLANCHE_URL = `/${MARQUE_BLANCHE_PATH}`

export const routes: Routes = [
  { path: '', redirectTo: 'a', pathMatch: 'full' },
  { path: APPLICATION_PATH, loadChildren: () => import('./principal/principal-routes').then(m => m.routes), canLoad: [IFrameRedirectVersMarqueBlancheGuard] },
  { path: MARQUE_BLANCHE_PATH, loadChildren: () => import('./marque-blanche/marque-blanche-routes').then(m => m.routes) },
  { path: 'experimentations', loadChildren: () => import('./experimentations/experimentations-routes').then(m => m.routes) },
  { path: '**', redirectTo: APPLICATION_PATH },
];
