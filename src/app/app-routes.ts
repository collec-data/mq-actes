import { Routes } from '@angular/router';
import { IFrameRedirectVersMarqueBlancheGuard } from './iframe-redirect.guard';

export const ACCUEIL_PATH = 'accueil';
export const ACCUEIL_URL = `/${ACCUEIL_PATH}`;

export const MARQUE_BLANCHE_PATH = 'marque-blanche';
export const MARQUE_BLANCHE_URL = `/${MARQUE_BLANCHE_PATH}`;

export const routes: Routes = [
  {path: '', redirectTo: ACCUEIL_PATH, pathMatch: 'full'},
  {
    path: ACCUEIL_PATH,
    loadChildren: () => import('./principal/principal-routes').then(m => m.routes),
    canLoad: [IFrameRedirectVersMarqueBlancheGuard]
  },
  {
    path: MARQUE_BLANCHE_PATH,
    loadChildren: () => import('./marque-blanche/marque-blanche-routes').then(m => m.routes)
  },
  {path: '**', redirectTo: ACCUEIL_PATH},
];
