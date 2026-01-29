let employeeFixture;

describe("Add Employee Flow", () => {

  before(() => {
    cy.generateEmployeeFixture().then((employee) => {
        employeeFixture = employee;
        cy.log(`Generated Employee: ${JSON.stringify(employeeFixture)}`);
        });
    });

  beforeEach(() => {
    cy.loginRoot();
    cy.wait(1000);
  });

  it.skip("can verify all validations for adding a new employee", () => {
    cy.visit("/");
    cy.wait(500);

    cy.get("body").then(($body) => {
      if ($body.find("#djHideToolBarButton:visible").length) {
        cy.get("#djHideToolBarButton").click();
      }
    });
    cy.wait(500);

    cy.get("a[href='/app/employees/']").should("be.visible").click();
    cy.wait(500);

    cy.get("a[href='/app/employees/create/']").should("be.visible").click();
    cy.wait(1000);

    cy.contains("button", "Create Employee")
      .scrollIntoView()
      .should("be.visible")
      .click();

    // Required field validations
    const requiredFields = [
      { name: "name", message: "Please enter your name" },
      { name: "surname", message: "Please enter your surname" },
      { name: "employee_id", message: "Please enter your employee ID" },
    ];

    requiredFields.forEach(({ name, message }) => {
      const domId = `id_${name}`;
      cy.get(`em[for='${domId}'].error-state`)
        .should("be.visible")
        .and("contain.text", message);
    });

    cy.wait(500);

    // Fill required fields except email
    cy.get("#id_name").clear().type("Cypress");
    cy.get("#id_surname").clear().type("Test");
    cy.get("#id_employee_id").clear().type(`CYP${Date.now()}`);

    cy.contains("button", "Create Employee")
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.wait(2500);

    // Email validation (top-level alert)
    cy.contains(
      ".alert.alert-danger li",
      "Please complete the email address or select 'User has no email'"
    ).should("be.visible");

    cy.get("#id_name").clear().type(employeeFixture.name);
    cy.get("#id_surname").clear().type(employeeFixture.surname);
    cy.get("#id_employee_id").clear().type(employeeFixture.employee_id);
    cy.get("#id_email")
      .clear()
      .type(employeeFixture.email, { parseSpecialCharSequences: false });

    cy.wait(500);

    cy.contains("button", "Create Employee")
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.url().should("include", "/app/employees/detail/");
    cy.wait(1000);

    cy.contains("a", "Delete Employee")
      .should("be.visible")
      .click();

    cy.wait(500);

    cy.get("#confirmation-modal:visible").within(() => {
      cy.contains("span.confirm", "Yes")
        .should("be.visible")
        .click();
    });

    cy.wait(1000);
    cy.url().should("include", "/app/employees/");
  });

  it("can add a new employee successfully", () => {
    cy.visit("/");
    cy.wait(500);
    cy.get("body").then(($body) => {
      if ($body.find("#djHideToolBarButton:visible").length) {
        cy.get("#djHideToolBarButton").click();
      }
    });
    cy.wait(500);

    cy.get("a[href='/app/employees/']").should("be.visible").click();
    cy.wait(500);
    cy.get("a[href='/app/employees/create/']").should("be.visible").click();
    cy.wait(1000);

    cy.get("#id_name").clear().type(employeeFixture.name);
    cy.get("#id_surname").clear().type(employeeFixture.surname);
    cy.get("#id_employee_id").clear().type(employeeFixture.employee_id);
    cy.get("#id_email")
      .clear()
      .type(employeeFixture.email, { parseSpecialCharSequences: false });

    cy.wait(1000);

    // we could add all fields eventually but not feasible now
    
    cy.contains("button", "Create Employee")
        .scrollIntoView()
        .should("be.visible")
        .click();
    cy.wait(1000);
});

});
