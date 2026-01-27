describe("View Employee Profile", () => {
  beforeEach(() => {
    cy.loginRoot();
  });

  it("can search for an existing employee and view their profile", () => {
    cy.fixture("employeeSearchTable").then((employeeFixture) => {
      const employee = employeeFixture[Math.floor(Math.random() * employeeFixture.length)];

      const searchableFields = [
        employee.name,
        employee.surname,
        employee.employee_id,
        employee.email,
        employee.entity
      ].filter((val) => val != null && val !== "");

      const randomValue = searchableFields[Math.floor(Math.random() * searchableFields.length)];

      cy.visit("/");

      cy.get("body").then(($body) => {
        if ($body.find("#djHideToolBarButton:visible").length) {
          cy.get("#djHideToolBarButton").click();
        }
      });

      cy.get("a[href='/app/employees/']").should("be.visible").click();
      cy.wait(1000);

      cy.get("input[name='q']").should("be.visible").type(randomValue, { delay: 50 }).type('{enter}');
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

    });
  });
  
  it("can navigate through the different tabs of an employee profile", () => {
    cy.fixture("employeeSearchTable").then((employeeFixture) => {
      const employee = employeeFixture[Math.floor(Math.random() * employeeFixture.length)];

      const searchableFields = [
        employee.name,
        employee.surname,
        employee.employee_id,
        employee.email,
        employee.entity
      ].filter((val) => val != null && val !== "");

      const randomValue = searchableFields[Math.floor(Math.random() * searchableFields.length)];

      cy.visit("/");

      cy.get("body").then(($body) => {
          if ($body.find("#djHideToolBarButton:visible").length) {
            cy.get("#djHideToolBarButton").click();
          }
      });

      cy.get("a[href='/app/employees/']").should("be.visible").click();
      cy.wait(1000);

      cy.get("input[name='q']").should("be.visible").type(randomValue, { delay: 50 }).type('{enter}');
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

      cy.contains("a", "Participant Activities").should("be.visible").click();
      cy.wait(1000);

      cy.contains("h1.normalize", "Employee Activities").should("be.visible");

      cy.contains("a", "Exercise Requests").should("be.visible").click();
      cy.wait(1000);

      cy.contains("h1.normalize", "Exercise Requests").should("be.visible");

      cy.contains("a", "Employment History").should("be.visible").click();
      cy.wait(1000);

      cy.contains("h1.normalize", "Employment History").should("be.visible");

      cy.contains("a", "Documents").should("be.visible").click();
      cy.wait(1000);

      cy.contains("h1.normalize", "Employee Documents").should("be.visible");

      cy.contains("a", "Advancements").should("be.visible").click();
      cy.wait(1000);

      cy.contains("h1.normalize", "Advancements").should("be.visible");

      cy.contains("a", "Audit Trail").should("be.visible").click();
      cy.wait(1000);

      cy.contains("h1.normalize", "Audit Trail").should("be.visible");
    });

  });

});