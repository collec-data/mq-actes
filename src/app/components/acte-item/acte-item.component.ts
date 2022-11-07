import { Component, Input } from '@angular/core';
import { Acte } from 'src/app/models/model';
import { experimentationsModules } from "../../experimentations/experimentations-modules";
import { TypeActePipe } from "../../shared/type-acte.pipe";

@Component({
  selector: 'app-acte-item',
  templateUrl: './acte-item.component.html',
  styleUrls: ['./acte-item.component.scss'],
  standalone: true,
  imports: [
    ...experimentationsModules,
    TypeActePipe
  ],
  host: {
    class: 'd-flex flex-column py-l pr-l g-m'
  }
})
export class ActeItemComponent {

  @Input()
  acte!: Acte;

  @Input()
  collapsed = false;

  collapse() {
    this.collapsed = true;
  }

  uncollapse() {
    this.collapsed = false;
  }
}
