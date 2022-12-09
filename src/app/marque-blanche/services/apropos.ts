import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AproposComponent } from "src/app/components/apropos/apropos.component";

@Injectable()
export class Apropos {

    private dialog = inject(MatDialog)

    ouvre_apropos() {
        this.dialog.open(
            AproposComponent
        )
    }
}