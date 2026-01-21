const { de } = require("@faker-js/faker");

describe("Edit Employee Profile", () => {
  beforeEach(() => {
    cy.loginRoot();
  });

  it("can search for an existing employee and edit their profile and cancel edits", () => {
      cy.visit("/");

      cy.get("body").then(($body) => {
        if ($body.find("#djHideToolBarButton:visible").length) {
          cy.get("#djHideToolBarButton").click();
        }
      });

      cy.get("a[href='/app/employees/']").should("be.visible").click();
      cy.wait(1000);

      cy.get("input[name='q']").should("be.visible").type("Cypress", { delay: 50 }).type('{enter}');
      cy.wait(1000);

      cy.get("#list_table").should("be.visible");

      cy.get("#list_table tbody tr").eq(1).should("be.visible");
      cy.wait(500);

      cy.get("#list_table tbody tr").eq(1)
        .within(() => {
            cy.get("button.dropdown-toggle")
            .should("be.visible")
            .click();
        });

      cy.contains("a", "View Profile").should("be.visible").click();
      cy.wait(1000);

      cy.contains("h1.normalize", "Employee Record").should("be.visible");

      cy.contains("a", "Edit Data").should("be.visible").click();
      cy.wait(2000);

      cy.contains("a", "Cancel").should("be.visible").click();
      cy.wait(2000);

    });

  it("can edit an employee profile and save changes", () => {
    cy.visit("/");

    cy.get("body").then(($body) => {
        if ($body.find("#djHideToolBarButton:visible").length) {
          cy.get("#djHideToolBarButton").click();
        }
      });

    cy.get("a[href='/app/employees/']").should("be.visible").click();
    cy.wait(1000);

    cy.get("input[name='q']").should("be.visible").type("Cypress", { delay: 50 }).type('{enter}');
    cy.wait(1000);

    cy.get("#list_table").should("be.visible");

    cy.get("#list_table tbody tr").eq(1).should("be.visible");
    cy.wait(500);

    cy.get("#list_table tbody tr").eq(1)
        .within(() => {
            cy.get("button.dropdown-toggle")
            .should("be.visible")
            .click();
        });

    cy.contains("a", "View Profile").should("be.visible").click();
    cy.wait(1000);

    cy.contains("h1.normalize", "Employee Record").should("be.visible");

    cy.contains("a", "Edit Data").should("be.visible").click();
    cy.wait(2000);
    
    cy.get("#id_name").clear().type("AutomatedTest");
    cy.get("#id_surname").clear().type("AutomatedTest");
    cy.get("#id_employee_id").clear().type(`CYP${Date.now()}`);
    cy.get("#id_email")
      .clear()
      .type("automatedtest@automatedtestc.com", { parseSpecialCharSequences: false });

    cy.wait(1000);

    cy.contains("button", "Save Data")
        .scrollIntoView()
        .should("be.visible").first()
        .click();
    cy.wait(1000);
  });

  it("can edit the employee and set the test values back", () => {
    cy.fixture("employeeSearchTable").then((employees) => {
    
    const employee = employees.find(e => e.name === "Cypress");

    expect(employee, "Cypress test employee exists in fixture").to.exist;

    cy.visit("/");

    cy.get("body").then(($body) => {
        if ($body.find("#djHideToolBarButton:visible").length) {
          cy.get("#djHideToolBarButton").click();
        }
      });

    cy.get("a[href='/app/employees/']").should("be.visible").click();
    cy.wait(1000);

    cy.get("input[name='q']").should("be.visible").type("Automated", { delay: 50 }).type('{enter}');
    cy.wait(1000);

    cy.get("#list_table").should("be.visible");

    cy.get("#list_table tbody tr").eq(1).should("be.visible");
    cy.wait(500);

    cy.get("#list_table tbody tr").eq(1)
        .within(() => {
            cy.get("button.dropdown-toggle")
            .should("be.visible")
            .click();
        });

    cy.contains("a", "View Profile").should("be.visible").click();
    cy.wait(1000);

    cy.contains("h1.normalize", "Employee Record").should("be.visible");

    cy.contains("a", "Edit Data").should("be.visible").click();
    cy.wait(2000);

    cy.get("#id_name").clear().type("Cypress", { delay: 50 });
    cy.get("#id_surname").clear().type("Test", { delay: 50 });
    cy.get("#id_employee_id").clear().type("CypressTest", { delay: 50 });
    cy.get("#id_email")
      .clear()
      .type("cypress@cypresstest.com", { delay: 50 });

    cy.contains("button", "Save Data")
        .scrollIntoView()
        .should("be.visible")
        .first()
        .click();
  });
  });
});