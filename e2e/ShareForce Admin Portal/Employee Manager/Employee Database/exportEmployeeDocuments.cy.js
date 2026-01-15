describe("Export Employee Documents", () => {

    beforeEach(() => {
        cy.loginRoot();
        cy.wait(1000);
    });

    it("can export employee documents successfully", () => {
        cy.visit("/");
        cy.wait(500);

        cy.get("body").then(($body) => {
            if ($body.find("#djHideToolBarButton:visible").length) {
                cy.get("#djHideToolBarButton").click();
            }
        });
        cy.wait(500);

        cy.get("a[href='/app/employees/']").should("be.visible").click();
        cy.wait(500);

        cy.get("button.btn.btn-sf-default.dropdown-toggle[data-toggle='dropdown']")
          .should("be.visible").contains("Export Data").click();

        cy.get("a.bg-file-trigger[data-url='/app/employees/export/documents/?']")
            .should("be.visible").click();

        cy.wait(2000);
        
        const downloadPath = 'cypress/downloads/Employee Documents.xlsx';
        cy.wait(2500);
        cy.readFile(downloadPath, { timeout: 15000 }).should((content) => {
            expect(content).to.not.be.empty;
        });
    });
});