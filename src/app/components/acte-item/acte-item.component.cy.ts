import { acte } from "src/app/models/acte.viewmodel.examples"
import { SharedModule } from "src/app/shared/shared.module"
import { ActeItemComponent } from "./acte-item.component"

describe('ActeItemComponent', () => {

        let exempleActe = acte()
        it('mounts', () => {

            cy.viewport('macbook-16')
            cy.mount(
                ActeItemComponent,
                {
                    declarations: [ActeItemComponent],
                    imports: [SharedModule],
                    componentProperties: { acte: exempleActe },
                })
        })

})