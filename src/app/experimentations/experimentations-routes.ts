import { Routes } from '@angular/router';
import { ListedocComponent } from './components/listedoc/listedoc.component';
import { ExperimentationsComponent } from './experimentations.component';

export const routes: Routes = [
  {path: '', component: ExperimentationsComponent},
  {path: 'listedoc', component: ListedocComponent},
];
