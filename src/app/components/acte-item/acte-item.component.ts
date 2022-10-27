import { Component, Input } from '@angular/core';
import { ViewModel } from 'src/app/models/acte.viewmodel';

@Component({
  selector: 'app-acte-item',
  templateUrl: './acte-item.component.html',
  styleUrls: ['./acte-item.component.sass']
})
export class ActeItemComponent {

  @Input()
  acte: ViewModel.Acte | null = null

  @Input()
  collapsed: boolean = false

  collapse() {
    this.collapsed = true;
  }

  uncollapse() {
    this.collapsed = false;
  }
}