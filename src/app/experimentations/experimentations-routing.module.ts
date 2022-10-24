import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentationsComponent } from './experimentations.component';

const routes: Routes = [{ path: '', component: ExperimentationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentationsRoutingModule { }
