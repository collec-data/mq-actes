import { Component, Input } from '@angular/core';
import { Acte } from 'src/app/models/model';
import { experimentationsModules } from "../../experimentations/experimentations-modules";
import { TypeActePipe } from "../../shared/type-acte.pipe";
import { animate, state, style, transition, trigger } from "@angular/animations";

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
    class: 'd-flex flex-column py-l pr-l'
  },
  animations: [
    trigger('collapsed', [
      state('open', style({
        height: '*',
        marginTop: '*',
        overflow: 'hidden'
      })),
      state('closed', style({
        height: '0px',
        marginTop: '0px',
        overflow: 'hidden'
      })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ]
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
