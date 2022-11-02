import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { SearchFiltersService } from "../components/search-panel/search-filters.service";
import { DatePipe } from "@angular/common";

export const routes: Routes = [
  {
    path: '',
    providers: [
      SearchFiltersService,
      DatePipe
    ],
    component: AccueilComponent
  }
];
