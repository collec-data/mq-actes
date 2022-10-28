import { Component } from '@angular/core';
import { sharedModules } from "../../../shared/shared-modules";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  standalone: true,
  imports: [
    ...sharedModules
  ]
})
export class AccueilComponent {
}
