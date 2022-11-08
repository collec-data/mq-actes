import { Component } from '@angular/core';
import { SearchListComponent } from "../search-list/search-list.component";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  standalone: true,
  imports: [
    SearchListComponent
  ],
  host: {
    class: 'd-flex'
  }
})
export class AccueilComponent {
}
