import { Component, ElementRef, HostListener, Input, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { Acte } from 'src/app/models/model';
import { ActeItemComponent } from "../acte-item/acte-item.component";
import { CommonModule } from "@angular/common";
import { ActeData, ActeDataSource } from "../../acte-data-source";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { debounceTime, Subject } from "rxjs";
import { PluralPipe } from "../../shared/plural.pipe";

@Component({
  selector: 'app-paginated-document-list',
  templateUrl: './paginated-document-list.component.html',
  styleUrls: ['./paginated-document-list.component.scss'],
  standalone: true,
    imports: [
        CommonModule,
        ActeItemComponent,
        InfiniteScrollModule,
        PluralPipe
    ],
  host: {
    class: 'd-flex flex-column'
  }
})
export class PaginatedDocumentListComponent implements OnInit {
  @Input() dataSource!: ActeDataSource;

  acteData?: ActeData;
  @ViewChild('scrollContainer') scrollContainer?: ElementRef;
  private needToCheckContainer = new Subject<void>();

  @HostListener('window:resize', ['$event'])
  private onResize() {
    this.needToCheckContainer.next();
  }

  ngOnInit() {
    this.dataSource.stream$.subscribe(acteData => {
      this.acteData = acteData;
      if (!acteData.loading && !acteData.noMoreElement) {
        // On indique qu'une vérification du contenu est à faire (voir plus loin).
        this.needToCheckContainer.next();
      }
    });

    // Vérification du contenu : permet de charger une page de données supplémentaire tant que la hauteur disponible
    // n'est pas occupée par les données récupérées.
    // La barre de défilement ne sera pas présente si trop peu de lignes sont affichées, ce qui empêcherait le
    // chargement de données supplémentaire qui se déclenche lorsque la barre de défilement atteint le bas de la page.
    this.needToCheckContainer.pipe(
      debounceTime(50)
    ).subscribe(() => {
      if (!this.scrollContainer || !this.acteData || this.acteData.loading || this.acteData.noMoreElement) {
        // si le chargement est en cours ou si l'on a déjà récupéré tous les éléments, on ne fait rien.
        return;
      }
      // On récupère le conteneur de la liste des résultats.
      const container = this.scrollContainer.nativeElement;
      // On charge la page suivante si la barre de défilement n'est pas affichée.
      if (container.scrollHeight === container.clientHeight) {
        this.dataSource.loadNextPage();
      }
    });
  }

  idTrackBy: TrackByFunction<Acte> = (_index: number, acte: Acte) => {
    return acte.id;
  }

  scrollTop() {
    this.scrollContainer?.nativeElement.scrollTo(0, 0);
  }
}
