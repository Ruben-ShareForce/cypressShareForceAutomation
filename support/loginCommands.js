Cypress.Commands.add("loginRoot", () => {
  const email = Cypress.env("LOGIN_EMAIL") || "dev@shareforce.co.za";
  const sessionId = ["user-session-cypress", email];

  cy.session(sessionId, () => {
    cy.visit("/account/login/");
    cy.get("#id_auth-username").type("dev@shareforce.co.za");
    cy.wait(500);
    cy.get("#auth_step_button").click();
    cy.wait(500);
    cy.get("#id_auth-password").type("ShareForce360!", { log: false });
    cy.wait(500);
    cy.get("#auth_step_button").click();
    cy.wait(2000);

    cy.url().should("include", "/app");

  }, {
    cacheAcrossSpecs: true
  });
});

Cypress.Commands.add("attemptLoginWithWrongPassword", (opts = {}) => {
  const {
    domain = "example.invalid",
    password = "wrongpassword",
    emailPrefix = "cypress-invalid",
  } = opts;

  const unique = `${Date.now()}-${Cypress._.random(1000, 9999)}`;
  const email = `${emailPrefix}${unique}@${domain}`;

  cy.get("#id_auth-username")
    .clear()
    .type(email, { parseSpecialCharSequences: false });

  cy.get("#auth_step_button").click();

  cy.get("#id_auth-password")
    .clear()
    .type(password, { log: false, parseSpecialCharSequences: false });

  cy.get("#auth_step_button").click();

  return cy.wrap(email, { log: false });
});

Cypress.Commands.add("attemptForgotPasswordWithFakeEmail", (opts = {}) => {
  const {
    domain = "example.invalid",
    emailPrefix = "cypress-invalid",
  } = opts;

  const unique = `${Date.now()}-${Cypress._.random(1000, 9999)}`;
  const email = `${emailPrefix}${unique}@${domain}`;

  cy.get("#id_auth-username")
    .clear()
    .type(email, { parseSpecialCharSequences: false });

  cy.get("#auth_step_button").click();

  return cy.wrap(email, { log: false });
});
