import { Routes } from '@angular/router';

export const ACCUEIL_PATH = '';
export const ACCUEIL_URL = `/${ACCUEIL_PATH}`;

export const MARQUE_BLANCHE_PATH = 'marque-blanche';
export const MARQUE_BLANCHE_URL = `/${MARQUE_BLANCHE_PATH}`;

export const routes: Routes = [
  {
    path: ACCUEIL_PATH,
    loadChildren: () => import('./marque-blanche/marque-blanche-routes').then(m => m.routes)
  },
  {path: '**', redirectTo: ACCUEIL_PATH},
];
