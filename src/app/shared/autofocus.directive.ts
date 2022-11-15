import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

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

  ngAfterViewInit() {
    setTimeout(() => {
      this.host.nativeElement.focus();
      this.host.nativeElement
        .querySelector('input,select,button,textarea')
        ?.focus();
    });
  }
}
