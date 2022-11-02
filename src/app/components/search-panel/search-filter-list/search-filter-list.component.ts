import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";

export type Filter = {
  label: string;
  data: any;
};

@Component({
  selector: 'app-search-filter-list',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './search-filter-list.html'
})
export class SearchFilterListComponent {

  @Input() filters: Filter[] = [{
    label: 'Ubrbanisme',
    data: null
  }, {
    label: '2022',
    data: null
  }, {
    label: 'Paimpont',
    data: null
  }, {
    label: 'Délibération',
    data: null
  }];

  clearFilter(index: number) {
    this.filters.splice(index, 1);
  }
}
