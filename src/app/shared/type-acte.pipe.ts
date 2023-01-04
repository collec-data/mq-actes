import { Pipe, PipeTransform } from "@angular/core";
import { Acte, typesActes } from "../models/model";

@Pipe({
  name: 'appTypeActe',
  standalone: true
})
export class TypeActePipe implements PipeTransform {
  transform(acte: Acte): any {
    if (acte.type === '7') {
      // Pour le type "Hors Préfecture", on affiche le détail si présent.
      return typesActes[acte.type] + (acte.nature_autre_detail ? `/${acte.nature_autre_detail}` : '');
    }

    return typesActes[acte.type];
  }
}
