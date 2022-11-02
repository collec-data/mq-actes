import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewModel } from "../../models/acte.viewmodel";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {
  AdvancedSearchParamsDialogComponent
} from "./advanced-search-params-dialog/advanced-search-params-dialog.component";
import { SearchFilterListComponent } from "./search-filter-list/search-filter-list.component";
import SearchParams = ViewModel.SearchParams;

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    SearchFilterListComponent,
  ],
  templateUrl: './search-panel.component.html'
})
export class SearchPanelComponent {
  searchParams: SearchParams = {
    query: ''
  };

  constructor(private dialog: MatDialog) {
  }

  openAdvancedParamsDialog() {
    // On ouvre la boîte de dialogue.
    // Celle-ci retourne les paramètres de recherche mis à jour en résultat.
    let dialogRef = this.dialog.open(AdvancedSearchParamsDialogComponent, {
      data: this.searchParams
    });
    dialogRef.afterClosed().subscribe(updatedSearchParams => {
      if (updatedSearchParams) {
        this.searchParams = {
          ...this.searchParams,
          ...updatedSearchParams
        };
      }
    });
  }

  search(form: NgForm, $event: any) {
    console.log('search', this.searchParams)
  }
}
