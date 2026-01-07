describe("ShareForce Login", () => {
    it("checks the validations for the initial login process", () => {
        cy.visit("/");
        cy.wait(500);

        cy.url().should("include", "/login");
    
        cy.get('#djHideToolBarButton').then(($btn) => {
            if ($btn.is(':visible')) {
                cy.get('#djHideToolBarButton').click();
            }
        });

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
    })
    it("logs onto the ShareForce Demo app", () => {
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
        cy.wait(500);
    })

})