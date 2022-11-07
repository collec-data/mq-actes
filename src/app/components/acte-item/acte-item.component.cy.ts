import { acte } from "src/app/models/model.examples";
import { ActeItemComponent } from "./acte-item.component";

describe('ActeItemComponent', () => {

  let exempleActe = acte()
  it('mounts', () => {

    cy.viewport('macbook-16');
    cy.mount(
      ActeItemComponent,
      {
        declarations: [ActeItemComponent],
        componentProperties: {acte: exempleActe},
      });
  });

});
