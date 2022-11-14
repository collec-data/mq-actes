import { Pipe, PipeTransform } from "@angular/core";

/**
 * Utilisation :
 * ```
 *   {{ nbItems | appPlural:'élément':'éléments' }}
 * ```
 */
@Pipe({
  name: 'appPlural',
  standalone: true
})
export class PluralPipe implements PipeTransform {
  transform(nbItems: number, single: string = '', plural: string = single + 's'): any {
    return nbItems <= 1 ? single : plural;
  }
}
