import { Component, inject, OnDestroy } from '@angular/core';
import { Subject } from "rxjs";
import { BreakpointObserver } from "@angular/cdk/layout";
import { takeUntil } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { SearchListComponent } from "../search-list/search-list.component";
import { PdfViewerComponent } from "../../../components/pdf-viewer/pdf-viewer.component";
import { Store } from "../../services/store";

const breakpointLarge = '(min-width: 960px)';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SearchListComponent,
    PdfViewerComponent
  ],
  providers: [
    Store
  ],
  host: {
    class: 'd-flex g-l m-l'
  }
})
export class AccueilComponent implements OnDestroy {
  private destroyed = new Subject<void>();
  store = inject(Store);

  showPdfViewer = false;

  constructor() {
    inject(BreakpointObserver)
      .observe([breakpointLarge])
      .pipe(takeUntil(this.destroyed))
      .subscribe(state => {
        const showPdfViewer = state.breakpoints[breakpointLarge];
        this.store.showPdfViewer(showPdfViewer);
        this.showPdfViewer = showPdfViewer;
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
