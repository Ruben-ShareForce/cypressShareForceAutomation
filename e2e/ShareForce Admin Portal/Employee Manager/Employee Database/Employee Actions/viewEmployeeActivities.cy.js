describe("View Employee Activities", () => {
  beforeEach(() => {
    cy.loginRoot();
  });

  it("can view an employee's activities", () => {
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

    cy.contains("a", "View Activities").should("be.visible").click();
    cy.wait(1000);

    cy.contains("h1.normalize", "Employee Activities").should("be.visible");

    });
});
});