import { Component } from '@angular/core';
import { sharedModules } from "../../../shared/shared-modules";
import { SearchPanelComponent } from "../../../components/search-panel/search-panel.component";
import { DocumentListComponent } from "../../../components/document-list/document-list.component";
import { Acte } from "../../../models/model";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  standalone: true,
  imports: [
    ...sharedModules,
    SearchPanelComponent,
    DocumentListComponent
  ]
})
export class AccueilComponent {
  actesPromise: Promise<Acte[]> | undefined;
}
