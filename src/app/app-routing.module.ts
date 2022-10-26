import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IFrameRedirectVersMarqueBlancheGuard } from './iframe-redirect.guard';

export const APPLICATION_PATH = 'a'
export const APPLICATION_URL = `/${APPLICATION_PATH}`

export const MARQUE_BLANCHE_PATH = 'marque-blanche'
export const MARQUE_BLANCHE_URL = `/${MARQUE_BLANCHE_PATH}`

const routes: Routes = [
  { path: '', redirectTo: 'a', pathMatch: 'full' },
  { path: APPLICATION_PATH, loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule), canLoad: [IFrameRedirectVersMarqueBlancheGuard] },
  { path: MARQUE_BLANCHE_PATH, loadChildren: () => import('./marque-blanche/marque-blanche.module').then(m => m.MarqueBlancheModule) },
  { path: 'experimentations', loadChildren: () => import('./experimentations/experimentations.module').then(m => m.ExperimentationsModule) },
  { path: '**', redirectTo: APPLICATION_PATH },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
