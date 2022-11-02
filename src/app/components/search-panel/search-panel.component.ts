import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchParams } from "../../models/model";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {
  AdvancedSearchParamsDialogComponent
} from "./advanced-search-params-dialog/advanced-search-params-dialog.component";
import { Filter, SearchFilterListComponent } from "./search-filter-list/search-filter-list.component";
import { SearchFiltersService } from "./search-filters.service";

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
  private searchParamsToFiltersService = inject(SearchFiltersService);
  private dialog = inject(MatDialog);

  searchParams: SearchParams = {
    query: ''
  };
  filters: Filter[] = [];

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
        this.filters = this.searchParamsToFiltersService.toFilters(this.searchParams);
      }
    });
  }

  search(form: NgForm, $event: any) {
    console.log('search', this.searchParams);
  }

  removeFilter(index: number) {
    const removedFilter = this.filters.splice(index, 1)[0];
    this.searchParams = this.searchParamsToFiltersService.removeFilter(this.searchParams, removedFilter);
  }
}
