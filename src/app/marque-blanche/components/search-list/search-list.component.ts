import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SearchPanelComponent } from "../../../components/search-panel/search-panel.component";
import {
  PaginatedDocumentListComponent
} from "../../../components/paginated-document-list/paginated-document-list.component";
import { ActeDataSource } from "../../../acte-data-source";
import { filter } from "rxjs/operators";
import { SearchParams } from "../../../models/model";
import { ActivatedRoute } from "@angular/router";

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

  initialSearch: SearchParams = {
    query: '',
    lignes: 10,
    siren: this.route.snapshot.queryParams['siren']
  };

  ngOnInit() {
    this.dataSource.stream$.pipe(
      filter(stream => stream.lastLoad === 'search')
    ).subscribe(() => {
      this.documentList?.scrollTop();
    });
  }
}
