import { AfterViewInit, Directive, ElementRef, inject, Input } from '@angular/core';
import { DirectiveOptions } from './directive-options.model';

/**
 * Directive donnant le comportement attendu à l'attribut "autofocus" sur les éléments.
 *
 * Permet de remédier au fait que les navigateurs ne donnent pas le focus aux éléments ajoutés dynamiquement
 * (l'attribut fonctionne nativement pour les éléments présents au chargement de la page).
 */
@Directive({
  // eslint-disable-next-line
  selector: '[autofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit {
  private host = inject(ElementRef);

  @Input('autofocus') options?: DirectiveOptions;

  ngAfterViewInit() {
    if (this.options?.ignore)
      return;

    setTimeout(() => {
      this.host.nativeElement.focus();
      this.host.nativeElement
        .querySelector('input,select,button,textarea')
        ?.focus();
    });
  }
}
