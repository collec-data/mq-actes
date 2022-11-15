import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { classifications, typesActes, SearchParams } from "../../../models/model";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

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
    MatTooltipModule
  ],
  templateUrl: './advanced-search-params-dialog.component.html'
})
export class AdvancedSearchParamsDialogComponent {

  updatedParams: SearchParams;

  readonly classifications = classifications;

  readonly typesActe = typesActes;

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
  }

  validate(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.updatedParams);
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
}
