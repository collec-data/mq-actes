import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { classifications, SearchParams, thematiques, typesActes } from "../../../models/model";
import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { getDateDebutPublicationsEnCours } from "../../../utils";
import { MatButtonToggleChange, MatButtonToggleModule } from "@angular/material/button-toggle";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule
  ],
  templateUrl: './advanced-search-params-dialog.component.html',
  styleUrls: ['./advanced-search-params-dialog.component.scss']
})
export class AdvancedSearchParamsDialogComponent {

  updatedParams: SearchParams;
  readonly classifications = classifications;
  readonly typesActe = typesActes;
  readonly thematiques = thematiques;

  constructor(
    private dialogRef: MatDialogRef<AdvancedSearchParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) initialParams: SearchParams
  ) {
    // On fait une copie des paramètres en entrée pour ne pas les modifier en cas d'annulation.
    this.updatedParams = {
      ...initialParams,
      classifications: new Set([...initialParams.classifications ?? []]),
      types_actes: new Set([...initialParams.types_actes ?? []]),
    };
    if (this.updatedParams.publications_en_cours) {
      this.updatedParams.date_debut = getDateDebutPublicationsEnCours();
    }
  }

  validate(form: NgForm) {
    console.log(this.updatedParams)
    if (form.valid) {
      const finalParams = this.updatedParams.publications_en_cours
        ? {
          ...this.updatedParams,
          date_debut: undefined
        }
        : this.updatedParams;

      this.dialogRef.close(finalParams);
    }
  }

  toggleElement<T>(set: Set<T> | undefined, elem: T) {
    if (!set) {
      return;
    }
    if (set.has(elem)) {
      set.delete(elem);
    } else {
      set.add(elem);
    }
  }

  updatePublicationEnCours(publicationEnCours: boolean, form: NgForm, debut: NgModel, fin: NgModel) {
    if (publicationEnCours) {
      const controlDebut = form.getControl(debut);
      const controlFin = form.getControl(fin);
      controlDebut.setValue(getDateDebutPublicationsEnCours());
      controlFin.setValue(null);
    }
  }

  thematiqueChange(changeEvent: MatButtonToggleChange) {
    this.updatedParams.thematique = this.updatedParams.thematique === changeEvent.value
      // désélectionne la thématique si déjà sélectionnée
      ? undefined
      : changeEvent.value;
  }
}
