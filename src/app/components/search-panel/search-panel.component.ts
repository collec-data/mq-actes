import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchParams } from "../../models/model";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {
  AdvancedSearchParamsDialogComponent
} from "./advanced-search-params-dialog/advanced-search-params-dialog.component";
import { Filter, SearchFilterListComponent } from "./search-filter-list/search-filter-list.component";
import { SearchFiltersService } from "./search-filters.service";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BehaviorSubject, map, Observable } from "rxjs";
import { AutofocusDirective } from "../../shared/autofocus.directive";

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
    MatTooltipModule,
    AutofocusDirective
  ],
  templateUrl: './search-panel.component.html'
})
export class SearchPanelComponent implements OnChanges {
  private searchParamsToFiltersService = inject(SearchFiltersService);
  private dialog = inject(MatDialog);
  private searchParamsSubject = new BehaviorSubject<SearchParams>({
    query: ''
  });

  @Input() set searchParams(params: SearchParams) {
    this.searchParamsSubject.next(params);
  }

  get searchParams() {
    return this.searchParamsSubject.getValue();
  }

  @Output() search = new EventEmitter<SearchParams>();

  filters: Observable<Filter[]> = this.searchParamsSubject.pipe(
    map((params) => this.searchParamsToFiltersService.toFilters(params))
  );

  ngOnChanges(changes: SimpleChanges) {
    if ('searchParams' in changes) {
      this.searchParams = changes['searchParams'].currentValue;
    }
  }

  openAdvancedParamsDialog() {
    // On ouvre la boîte de dialogue.
    // Celle-ci retourne les paramètres de recherche mis à jour en résultat.
    let dialogRef = this.dialog.open(AdvancedSearchParamsDialogComponent, {
      data: this.searchParams,
      width: '40rem',
      autoFocus: 'input'
    });
    dialogRef.afterClosed().subscribe(updatedSearchParams => {
      if (updatedSearchParams) {
        this.searchParams = {
          ...this.searchParams,
          ...updatedSearchParams
        };
        this.search.emit(this.searchParams);
      }
    });
  }

  removeFilter(filterToRemove: Filter) {
    this.searchParams = this.searchParamsToFiltersService.removeFilter(this.searchParams, filterToRemove);
    this.search.emit(this.searchParams);
  }
}
