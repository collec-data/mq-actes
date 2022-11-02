import { acte } from "src/app/models/model.examples";
import { sharedModules } from "src/app/shared/shared-modules";
import { ActeItemComponent } from "./acte-item.component";

describe('ActeItemComponent', () => {

  let exempleActe = acte()
  it('mounts', () => {

    cy.viewport('macbook-16');
    cy.mount(
      ActeItemComponent,
      {
        declarations: [ActeItemComponent],
        imports: [...sharedModules],
        componentProperties: {acte: exempleActe},
      });
  });

});
