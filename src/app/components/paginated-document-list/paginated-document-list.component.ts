import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Acte, Page, Pageable } from 'src/app/models/model';
import { ActeItemComponent } from "../acte-item/acte-item.component";
import { CommonModule } from "@angular/common";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-paginated-document-list',
  templateUrl: './paginated-document-list.component.html',
  styleUrls: ['./paginated-document-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ActeItemComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  host: {
    class: 'd-flex flex-column'
  }
})
export class PaginatedDocumentListComponent implements AfterViewInit {
  data: Acte[] = [];
  @Input() currentPage?: Page<Acte>;
  @Input() loading = false;
  @Output() pageRequest = new EventEmitter<Pageable>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.paginator.page.subscribe((pageEvent) => {
      this.pageRequest.emit({
        debut: pageEvent.pageIndex * pageEvent.pageSize,
        lignes: pageEvent.pageSize
      })
    });
  }

  public loadPage(page: Page<Acte>) {
    this.currentPage = page;
    this.data = page.items;
  }
}
