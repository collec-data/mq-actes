import { Component, Input } from '@angular/core';
import { Acte } from 'src/app/models/model';
import { experimentationsModules } from "../../experimentations/experimentations-modules";

@Component({
  selector: 'app-acte-item',
  templateUrl: './acte-item.component.html',
  styleUrls: ['./acte-item.component.scss'],
  standalone: true,
  imports: [
    ...experimentationsModules
  ]
})
export class ActeItemComponent {

  @Input()
  acte: Acte | null = null

  @Input()
  collapsed: boolean = false

  collapse() {
    this.collapsed = true;
  }

  uncollapse() {
    this.collapsed = false;
  }
}
