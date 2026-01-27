describe("Disable 2-Factor Authentication", () => {
  beforeEach(() => {
    cy.loginRoot();
  });

  it("can select a random employee and disable 2FA", () => {
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

    cy.contains("a", "Disable 2FA").should("be.visible").click();
    cy.wait(1000);

    cy.contains("span", "Yes").should("be.visible").click();
    cy.wait(500);

    cy.get("div.alert.alert-dismissable.alert-info").should("be.visible").contains("The employee's two-factor authentication has been deactivated.");
  });
  });
});