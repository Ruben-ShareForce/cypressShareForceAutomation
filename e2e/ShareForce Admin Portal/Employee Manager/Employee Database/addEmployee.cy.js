describe("Add Employee Flow" , () => {

    let employeeFixture;

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

        cy.get('#djHideToolBarButton').then(($btn) => {
            if ($btn.is(':visible')) {
                cy.get('#djHideToolBarButton').click();
            }
        });
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
        cy.wait(4000);

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

        // removing required field validations by filling in data
        cy.get("#id_name").type("Cypress");
        cy.get("#id_surname").type("Test");
        cy.get("#id_employee_id").type(`CYP${Date.now()}`);

        cy.contains("button", "Create Employee")
            .scrollIntoView()
            .should("be.visible")
            .click();

        cy.wait(2500);

        // having to trigger email validation manually afterwards
        const globalValidations = [
            { message: "Please complete the email address or select 'User has no email'" },
        ];

        globalValidations.forEach(({ message }) => {
            cy.contains(".alert.alert-danger li",
                "Please complete the email address or select 'User has no email'").should("be.visible");
        });


        cy.generateEmployeeFixture().then((employee) => {
            cy.get("#id_name").clear().type(employee.name);
            cy.get("#id_surname").clear().type(employee.surname);
            cy.get("#id_employee_id").clear().type(employee.employee_id);
            cy.get("#id_email").clear().type(employee.email, { parseSpecialCharSequences: false });
        });

        cy.wait(500);
        
        cy.contains("button", "Create Employee").scrollIntoView().should("be.visible").click();
        cy.wait(1000);

        cy.contains("a", "Delete Employee")
            .should("be.visible")
            .click();

        cy.wait(500);

        cy.get("span.btn.btn-sf-lightblue.confirm").should("be.visible").first().click();

    });

    it("can add a new employee successfully", () => {
        cy.visit("/");
        cy.wait(500);

        cy.get('#djHideToolBarButton').then(($btn) => {
            if ($btn.is(':visible')) {
                cy.get('#djHideToolBarButton').click();
            }
        });
        cy.wait(500);

        cy.get("a[href='/app/employees/']").should("be.visible").click();
        cy.wait(500);

        cy.get("a[href='/app/employees/create/']").should("be.visible").click();
        cy.wait(1000);

        cy.generateEmployeeFixture().then((employee) => {
            cy.get("#id_name").clear().type(employee.name);
            cy.get("#id_surname").clear().type(employee.surname);
            cy.get("#id_employee_id").clear().type(employee.employee_id);
            cy.get("#id_email").clear().type(employee.email, { parseSpecialCharSequences: false });
        });

        cy.wait(500);
        
        // we could add all fields for an employee but it would be a lot of overhead due to the amount of fields

        cy.contains("button", "Create Employee").scrollIntoView().should("be.visible").click();
        cy.wait(1000);

        

    });

});