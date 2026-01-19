describe("Export Employee Award Logs", () => {
 
    beforeEach(() => {
        cy.loginRoot();
        cy.wait(1000);
    });
 
    it("can export employee award logs successfully", () => {
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
 
        cy.get("a.bg-file-trigger[data-url='/app/employees/export/awardlogs/?']")
            .should("be.visible").click();
 
        cy.wait(2000);
       
    });
});