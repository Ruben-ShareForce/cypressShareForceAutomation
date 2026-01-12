describe("Add Employee Flow" , () => {
    beforeEach(() => {
        cy.loginRoot();
        cy.wait(1000);
    });
    
    it("can verify all validations for adding a new employee", () => {
        cy.visit("/");
        cy.wait(500);

        cy.get("a[href='/app/employees/']").should("be.visible").click();
        cy.wait(500);

        cy.get("a[href='/app/employees/create/']").should("be.visible").click();
        cy.wait(1000);

        // cancel logic here
        cy.get("a[href='/app/employees/']").first().scrollIntoView().should("be.visible").click();
        cy.wait(1000);
        // end of cancel logic

        cy.get("a[href='/app/employees/create/']").should("be.visible").click();
        cy.wait(2000);

        // click add button to trigger validations
        cy.contains("button", "Create Employee")
            .scrollIntoView()
            .should("be.visible")
            .click();

        // required validations
        const requiredFields= [
            { name: "name", message: "Please enter your name" },
            { name: "surname", message: "Please enter your surname" },
            { name: "employee_id", message: "Please enter your employee ID" },
        ];

       requiredFields.forEach(({ name, message }) => {
            const domId = name.startsWith("id_") ? name : `id_${name}`;

            cy.get(`em[for='${domId}'].error-state`)
                .should('be.visible')
                .and('contain.text', message);
        });

        cy.wait(500);
    });

});