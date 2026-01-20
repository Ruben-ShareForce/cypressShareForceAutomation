describe("Search Employee Flow", () => {
  beforeEach(() => {
    cy.loginRoot();
  });

  it("can search for an existing employee by different search criteria", () => {
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
    });
  });

  it("shows no results when searching for a non-existing employee", () => {
        cy.visit("/");

        cy.get("a[href='/app/employees/']").should("be.visible").click();
        cy.wait(1000);

        cy.get("input[name='q']").should("be.visible").type("nonexistent_employee", { delay: 50 }).type('{enter}');
        cy.wait(1000);

        cy.get(".sf-box-inner").should("be.visible").and("contain.text", "No employees matched your search query.");
    });

    it("can clear the search results for both an existing and non-existing employee", () => {
        cy.visit("/");

        cy.get("a[href='/app/employees/']").should("be.visible").click();
        cy.wait(1000);

        // Search for an existing employee
        cy.get("input[name='q']").should("be.visible").type("Cypress", { delay: 50 }).type('{enter}');
        cy.wait(1000);
        cy.contains("tr", "Cypress Test").should("be.visible");
        cy.wait(1000);
        cy.contains("a[href='/app/employees/']", "Clear search results").should("be.visible").click();
        cy.wait(1000);
        
        // Search for a non-existing employee
        cy.get("input[name='q']").should("be.visible").type("nonexistent_employee", { delay: 50 }).type('{enter}');
        cy.wait(1000);
        cy.get(".sf-box-inner").should("be.visible").and("contain.text", "No employees matched your search query.");
        cy.wait(1000);

        cy.contains("a[href='/app/employees/']", "Clear search results").should("be.visible").click();
        cy.wait(1000);

        cy.get("#list_table tbody tr")
            .its("length")
            .should("be.greaterThan", 2);

    });

});
