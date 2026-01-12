describe("Forgout Password Flow" , () => {
    it("triggers the forgot password flow", () => {
        cy.visit("/");
        cy.wait(500);

        cy.url().should("include", "/login");

        cy.get("#djHideToolBarButton").then(($btn) => {
            if ($btn.is(":visible")) {
                cy.get("#djHideToolBarButton").click();
            }
        });
        cy.wait(500);

        cy.attemptForgotPasswordWithFakeEmail();
        cy.wait(500);

        cy.get("#forgot_password_link").should("be.visible").click();
        cy.wait(500);

        cy.url().should("include", "/password_reset");
        cy.wait(500);

        cy.get("a.float-right.text-white.pt-1.fp_link").should("be.visible").click();
        cy.wait(500);

        cy.get("#id_auth-username").type("dev@shareforce.co.za");
        cy.wait(500);
        cy.get("#auth_step_button").click();
        cy.wait(500);

        cy.get("#forgot_password_link").should("be.visible").click();
        cy.wait(500);

        cy.url().should("include", "/password_reset");
        cy.wait(500);

        cy.get("button.btn.bg-secondary.text-white.text-uppercase").should("be.visible").click();
        cy.wait(1000);

        cy.get("h1.text-white.open-sans-reg").should("be.visible").contains("Thanks!");
        cy.get("p.text-white.mb-2.opensans-normal").should("be.visible").contains("We have emailed you instructions for setting your password, if an account exists with the email you entered. You should receive them shortly.");

        cy.wait(500);
    });

    it("checks for the forgot password mail and redirect", () => {
        cy.visit("http://localhost:8025");
        cy.wait(1000);

        cy.contains("button", "Inbox").click({ force: true });
        cy.wait(1000);

        cy.get("a.message")
            .filter(':contains("ShareForce password reset")')
            .first()
            .click();
        cy.wait(500);

        cy.get('a[href*="/reset/"]')
        .first()
        .invoke('attr', 'href')
        .then((resetUrl) => {
            const httpUrl = resetUrl.replace(/^https:\/\//, "http://");

            cy.visit(httpUrl);

            cy.origin("http://127.0.0.1:8000", () => {
            cy.get("#djHideToolBarButton").then(($btn) => {
                if ($btn.is(":visible")) {
                cy.wrap($btn).click();
                }
            });

            cy.get("h1.text-white.open-sans-reg", { timeout: 10000 })
                .should("be.visible")
                .and("contain.text", "Set your Password");

            cy.get("p.text-white.mb-2.opensans-normal", { timeout: 10000 })
                .should("be.visible")
                .and("contain.text", "Please set your new password.");
            });
        });

    });
});