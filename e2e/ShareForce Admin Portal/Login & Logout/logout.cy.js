describe("ShareForce Logout", () => {
    it("logs in and out of the ShareForce app", () => {
            cy.visit("/");
            cy.wait(500);

            cy.url().should("include", "/login");

            cy.get("#djHideToolBarButton").then(($btn) => {
                if ($btn.is(":visible")) {
                    cy.get("#djHideToolBarButton").click();
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

            cy.reload();

            cy.get("a.account-link.account-options.dropdown-toggle").should("be.visible").click();
            cy.wait(500);

            cy.get("a").contains("Logout").should("be.visible").click();
            cy.wait(500);

            cy.contains("p.mb20", "Are you sure you want to logout of your account?").should("be.visible");
            cy.wait(500);

            cy.get("a.btn.btn-sf-lightblue").should("be.visible").click();
            cy.wait(500);
            
            cy.url().should("include", "/login");

        });
});