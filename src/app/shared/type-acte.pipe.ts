import { Pipe, PipeTransform } from "@angular/core";
import { typesActes } from "../models/model";

@Pipe({
  name: 'appTypeActe',
  standalone: true
})
export class TypeActePipe implements PipeTransform {
  transform(typeActeCode: keyof typeof typesActes): any {
    return typesActes[typeActeCode];
  }
}
