import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AproposComponent } from "src/app/components/apropos/apropos.component";
import { EnvService } from "src/app/env.service";

@Injectable()
export class Apropos {

    private env = inject(EnvService)
    private dialog = inject(MatDialog)

    ouvre_apropos() {
        this.dialog.open(
            AproposComponent, {
                data: { 
                    src_url: this.env.apropos_url ,
                },
                autoFocus: 'mat-dialog-content',
                panelClass: 'fullscreen-pane-xs',
            }
        )
    }
}