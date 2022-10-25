import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListedocComponent } from './components/listedoc/listedoc.component';
import { ExperimentationsComponent } from './experimentations.component';

const routes: Routes = [
  { path: '', component: ExperimentationsComponent },
  { path: 'listedoc', component: ListedocComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentationsRoutingModule { }
