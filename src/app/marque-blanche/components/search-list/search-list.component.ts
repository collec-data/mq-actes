import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SearchPanelComponent } from "../../../components/search-panel/search-panel.component";
import {
  PaginatedDocumentListComponent
} from "../../../components/paginated-document-list/paginated-document-list.component";
import { ActeDataSource } from "../../../acte-data-source";
import { filter } from "rxjs/operators";
import { SearchParams } from "../../../models/model";
import { ActivatedRoute, Router } from "@angular/router";
import { queryParamsToSearchParams, searchParamsToQueryParams } from "../../../utils";
import { Store } from "../../services/store";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  standalone: true,
  imports: [
    SearchPanelComponent,
    PaginatedDocumentListComponent
  ],
  host: {
    class: 'd-flex flex-column'
  }
})
export class SearchListComponent implements OnInit {
  dataSource = new ActeDataSource();
  @ViewChild(PaginatedDocumentListComponent) documentList?: PaginatedDocumentListComponent;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  initialSearch = queryParamsToSearchParams(this.route.snapshot.queryParams);

  ngOnInit() {
    this.dataSource.stream$.pipe(
      filter(stream => stream.lastLoad === 'search')
    ).subscribe(() => {
      this.documentList?.scrollTop();
    });
  }

  launchNewSearch(searchParams: SearchParams) {
    this.dataSource.search(searchParams);
    this.store.updateSearchParams(searchParams);
    this.router.navigate([], {queryParams: searchParamsToQueryParams(searchParams)});
  }
}
