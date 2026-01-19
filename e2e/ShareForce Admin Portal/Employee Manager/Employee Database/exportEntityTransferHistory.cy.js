describe("Export Entity Transfer History", () => {

    beforeEach(() => {
        cy.loginRoot();
        cy.wait(1000);
    });

    it("can export employee entity transfer history successfully", () => {
        cy.visit("/");

        cy.get("body").then(($body) => {
            if ($body.find("#djHideToolBarButton:visible").length) {
            cy.get("#djHideToolBarButton").click();
            }
        });

        cy.get("a[href='/app/employees/']").should("be.visible").click();

        cy.get("button.btn.btn-sf-default.dropdown-toggle[data-toggle='dropdown']")
            .contains("Export Data")
            .should("be.visible")
            .click();

        cy.intercept("GET", "**/app/employees/export/transfers/**").as("startExport");

        cy.get("a.bg-file-trigger[data-url^='/app/employees/export/transfers/']")
            .should("be.visible")
            .click();

        cy.wait("@startExport").then(({ response }) => {
            expect(response.statusCode).to.eq(200);

        });

        const downloadsFolder = Cypress.config("downloadsFolder");
        const filePath = `${downloadsFolder}/TransferHistory.xlsx`;

        cy.readFile(filePath, "binary", { timeout: 30000 }).should((content) => {
            expect(content.length).to.be.greaterThan(1000);
        });
        });

});