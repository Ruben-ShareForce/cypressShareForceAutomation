describe("ShareForce Login & Validation Checks", () => {
    it("checks the validations for the initial login process", () => {
        cy.visit("/");
        cy.wait(1000);

        cy.url().should("include", "/login");
        cy.wait(500);

        cy.get('#djHideToolBarButton').then(($btn) => {
            if ($btn.is(':visible')) {
                cy.get('#djHideToolBarButton').click();
            }
        });
        cy.wait(500);

        // required field validation
        cy.get("#auth_step_button").click();

        const requiredValidations = [
            { name: "id_auth-username", message: "Please enter your email address" }
        ];

        requiredValidations.forEach(({ name, message }) => {
            cy.get(`p[for='${name}'].error-red`)
                .filter(':visible')
                .first()
                .should('contain.text', message);
        });
        cy.wait(500);

        // minimum format validation
        cy.get("#id_auth-username").type("test");
        cy.wait(500);

        const formatValidations = [
            { name: "id_auth-username", message: "Your email address is not formatted correctly" }
        ];

        formatValidations.forEach(({ name, message }) => {
            cy.get(`p[for='${name}'].error-red`)
                .filter(':visible')
                .first()
                .should('contain.text', message);
        });
        cy.wait(500);

        cy.attemptLoginWithWrongPassword();
        cy.wait(500);

        cy.get("#login-form")
        .contains("p.error-red", "Your username and password didn't match. Please try again.", { timeout: 10000 })
        .should("be.visible");

    });

    it("logs onto the ShareForce app", () => {
        cy.visit("/");
        cy.wait(500);

        cy.url().should("include", "/login");

        cy.get('#djHideToolBarButton').then(($btn) => {
            if ($btn.is(':visible')) {
                cy.get('#djHideToolBarButton').click();
            }
        });

        cy.get("#id_auth-username").type("dev@shareforce.co.za");
        cy.wait(500);
        cy.get("#auth_step_button").click();
        cy.wait(500);

        cy.get("#id_auth-password").type("ShareForce360!", { log: false });
        cy.wait(500);
        cy.get("#auth_step_button").click();
        cy.wait(2000);

        cy.url().should("include", "/app");


    });
});
