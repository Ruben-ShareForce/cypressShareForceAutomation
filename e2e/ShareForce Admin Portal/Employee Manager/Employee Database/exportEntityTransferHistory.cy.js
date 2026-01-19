describe("Export Entity Transfer History", () => {

    beforeEach(() => {
        cy.loginRoot();
        cy.wait(1000);
    });

    it("can export employee entity transfer history successfully", () => {
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

        cy.get("a.bg-file-trigger[data-url='/app/employees/export/transfers/?']")
            .should("be.visible").click();

        cy.wait(2000);
        
    it("can export employee entity transfer history successfully", () => {
        cy.loginRoot();

        cy.intercept("GET", "/app/employees/export/transfers/?").as("export");

        cy.visit("/app/employees/");

        cy.get("button.btn.btn-sf-default.dropdown-toggle")
            .contains("Export Data")
            .click();

        cy.get("a.bg-file-trigger[data-url='/app/employees/export/transfers/?']")
            .click();

        cy.wait("@export").then(({ response }) => {
            expect(response.statusCode).to.eq(200);

            expect(response.body).to.exist;
            expect(response.body.length).to.be.greaterThan(1000);

            expect(response.headers["content-type"])
            .to.include("spreadsheet");

            expect(response.headers["content-disposition"])
            .to.include("attachment");
        });
    });

    });
});