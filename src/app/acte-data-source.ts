import { BehaviorSubject, finalize, Subscription } from "rxjs";
import { SearchService } from "./search.service";
import { inject } from "@angular/core";
import { Acte, Pageable, SearchParams } from "./models/model";

export type ActeData = {
  searchLaunched: boolean,
  loading: boolean,
  items: Acte[],
  total: number,
  lastLoad?: 'search' | 'page',
  noMoreElement?: boolean
};

export class ActeDataSource {
  private stream = new BehaviorSubject<ActeData>({
    searchLaunched: false,
    loading: false,
    items: [],
    total: 0
  });
  stream$ = this.stream.asObservable();

  private searchParams?: SearchParams & Pageable;
  private nextPageToken?: string;
  private pendingSearch?: Subscription;
  private pendingPage?: Subscription;

  private searchService = inject(SearchService);

  private cancelSearch() {
    this.pendingSearch?.unsubscribe();
  }

  private cancelPage() {
    this.pendingPage?.unsubscribe();
  }

  search(params: SearchParams & Pageable) {
    this.cancelPage();
    this.cancelSearch();

    this.searchParams = params;
    this.stream.next({
      ...this.stream.value,
      items: [],
      loading: true,
      lastLoad: 'search'
    });

    this.pendingSearch = this.searchService.search(params)
      .pipe(
        finalize(() => {
          this.pendingSearch = undefined;
        })
      )
      .subscribe((pageResult) => {
        this.nextPageToken = pageResult.page_suivante;
        this.stream.next({
          searchLaunched: true,
          loading: false,
          items: pageResult.resultats,
          total: pageResult.nb_resultats,
          noMoreElement: !pageResult.page_suivante
        });
      });
  }

  loadNextPage(): void {
    if (!this.searchParams || !this.nextPageToken || this.pendingSearch || this.pendingPage) {
      return;
    }

    this.stream.next({
      ...this.stream.value,
      loading: true,
      lastLoad: 'page'
    });

    this.pendingPage = this.searchService.search({
      ...this.searchParams,
      page_suivante: this.nextPageToken
    })
      .pipe(
        finalize(() => {
          this.pendingPage = undefined;
        })
      )
      .subscribe((pageResult) => {
        this.nextPageToken = pageResult.page_suivante;
        this.stream.next({
          ...this.stream.value,
          loading: false,
          items: [...this.stream.value.items, ...pageResult.resultats],
          total: pageResult.nb_resultats,
          noMoreElement: !pageResult.page_suivante
        });
      });
  }
}
