Cypress.Commands.add("generateEmployeeFixture", () => {
  return cy.task("generateEmployee");
});
