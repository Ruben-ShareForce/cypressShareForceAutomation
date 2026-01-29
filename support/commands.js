Cypress.Commands.add("generateEmployeeFixture", () => {
  return cy.task("generateEmployee");
});

Cypress.Commands.add("generateEntityFixture", () => {
  return cy.task("generateEntity");
});
