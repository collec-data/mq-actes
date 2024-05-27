import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { Apropos } from 'src/app/marque-blanche/services/apropos';

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
  styleUrls: ['./search-panel.component.scss'],
  templateUrl: './search-panel.component.html',
})
export class SearchPanelComponent implements OnChanges, OnInit {
  apropos = inject(Apropos)
  private searchParamsToFiltersService = inject(SearchFiltersService);
  private dialog = inject(MatDialog);
  private searchParamsSubject = new BehaviorSubject<SearchParams>({
    query: '',
    publications_en_cours: false
  });

  @Input() set searchParams(params: SearchParams) {
    this.searchParamsSubject.next(params);
  }

  /**
   * Indique si une recherche doit être émise dès l'initialisation du composant.
   */
  @Input() launchFirstSearch = false;

  get searchParams() {
    return this.searchParamsSubject.getValue();
  }

  @Output() searchRequest = new EventEmitter<SearchParams>();

  filters: Observable<Filter[]> = this.searchParamsSubject.pipe(
    map((params) => this.searchParamsToFiltersService.toFilters(params))
  );

  ngOnInit() {
    if (this.launchFirstSearch) {
      this.launchSearch();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('searchParams' in changes) {
      this.searchParams = changes['searchParams'].currentValue;
    }
  }

  get is_in_iframe() {
    return !(window.self === window.top);
  }

  launchSearch() {
    let params = this.searchParams;
    // On émet une copie des paramètres de recherche pour qu'il soit impossible de les modifier à notre insu.
    this.searchRequest.emit({
      ...params,
      classifications: params.classifications ? new Set(params.classifications) : undefined,
      types_actes: params.types_actes ? new Set(params.types_actes) : undefined,
      date_debut: params.date_debut ? new Date(params.date_debut) : undefined,
      date_fin: params.date_fin ? new Date(params.date_fin) : undefined,
      date_de_publication_debut: params.date_de_publication_debut ? new Date(params.date_de_publication_debut) : undefined,
      date_de_publication_fin: params.date_de_publication_fin ? new Date(params.date_de_publication_fin) : undefined,
    });
  }

  openAdvancedParamsDialog() {
    // On ouvre la boîte de dialogue.
    // Celle-ci retourne les paramètres de recherche mis à jour en résultat.
    let dialogRef = this.dialog.open(AdvancedSearchParamsDialogComponent, {
      data: this.searchParams,
      width: '40rem',
      autoFocus: 'input',
      panelClass: 'fullscreen-pane-xs'
    });
    dialogRef.afterClosed().subscribe(updatedSearchParams => {
      if (updatedSearchParams) {
        this.searchParams = {
          ...this.searchParams,
          ...updatedSearchParams
        };
        this.launchSearch();
      }
    });
  }

  removeFilter(filterToRemove: Filter) {
    this.searchParams = this.searchParamsToFiltersService.removeFilter(this.searchParams, filterToRemove);
    this.launchSearch();
  }

  basculerPublicationEnCours() {
    this.searchParams = this.searchParams.publications_en_cours
      ? {
        ...this.searchParams,
        publications_en_cours: false
      }
      : {
        ...this.searchParams,
        publications_en_cours: true,
        date_de_publication_debut: undefined,
        date_de_publication_fin: undefined
      };
  }
}
