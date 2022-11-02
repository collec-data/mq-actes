const getIframeDocument = () => {
  // return cy.get('iframe')
  //     .its('0.contentDocument');
  return cy.get('iframe[data-cy="the-i-frame"]')
    // Cypress yields jQuery element, which has the real
    // DOM element under property "0".
    // From the real DOM iframe element we can get
    // the "document" element, it is stored in "contentDocument" property
    // Cypress "its" command can access deep properties using dot notation
    // https://on.cypress.io/its
    .its('0.contentDocument').should('exist');
}

const getIframeBody = () => {
  return getIframeDocument()
    .its('body').should('not.be.undefined')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    .then(cy.wrap);
}

describe("Charge l'application via une iframe", () => {
  it("Visite une page qui intègre l'application via iframe", {baseUrl: null}, () => {
    cy.visit("./cypress/support/iframed-index.html");
    cy.contains('marque blanche est integrée en tant que iframe');

    getIframeBody().contains("la partie iframe de l'application");
  })
});
