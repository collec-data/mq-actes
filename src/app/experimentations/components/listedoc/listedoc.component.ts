import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ViewModel } from 'src/app/models/acte.viewmodel';
import { acte, actes } from '../../../models/acte.viewmodel.examples'
import { ActeItemComponent } from "../../../components/acte-item/acte-item.component";
import { experimentationsModules } from "../../experimentations-modules";

interface Node {
  expandable: boolean;
  acte: ViewModel.Acte;
  level: number;
}

@Component({
  selector: 'app-listedoc',
  templateUrl: './listedoc.component.html',
  standalone: true,
  imports: [
    ...experimentationsModules,
    ActeItemComponent
  ]
})
export class ListedocComponent {

  _un_acte = acte()
  _des_actes = actes()

  _actes = actes()
    .map(acte => {
      // @ts-ignore
      acte.children = [acte];
      return acte;
    });

  private _transformer = (acte: ViewModel.Acte, level: number) => {
    return {
      expandable: level == 0,
      acte: acte,
      level: level,
    }
  }

  treeControl = new FlatTreeControl<Node>(node => node.level, node => node.expandable)
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => {
      // @ts-ignore
      return node.children
    }
  )
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = this._actes
  }

  hasChild(_: number, node: Node) {
    return node.expandable
  }
}
