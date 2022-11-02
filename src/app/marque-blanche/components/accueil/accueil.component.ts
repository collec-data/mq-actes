import { Component } from '@angular/core';
import { sharedModules } from "../../../shared/shared-modules";
import { SearchPanelComponent } from "../../../components/search-panel/search-panel.component";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  standalone: true,
  imports: [
    ...sharedModules,
    SearchPanelComponent
  ]
})
export class AccueilComponent {
}
