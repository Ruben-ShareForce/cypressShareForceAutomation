describe("Resend Activation Email", () => {
  beforeEach(() => {
    cy.loginRoot();
  });

  it.skip("can filter for active employees and resend activation email", () => {
    cy.visit("/");

    cy.get("body").then(($body) => {
        if ($body.find("#djHideToolBarButton:visible").length) {
          cy.get("#djHideToolBarButton").click();
        }
      });

    cy.get("a[href='/app/employees/']").should("be.visible").click();
    cy.wait(1000);

    cy.get("button[data-toggle='collapse'][data-target='#collapseOne']").should("be.visible").click();
    cy.wait(1000);

    cy.get("#id_account_status")
      .should("be.visible")
      .select("True");

    cy.wait(500);
    cy.get("button[type='submit'][class='btn btn-sf-lightblue pull_right']")
        .should("be.visible")
        .click();
    cy.wait(1000);

    cy.get("#list_table").should("be.visible");

    cy.get("#list_table tbody tr").eq(1).should("be.visible");
    cy.wait(500);

    cy.get("#list_table tbody tr").eq(1)
        .within(() => {
            cy.get("button.dropdown-toggle")
            .should("be.visible")
            .click();
        });
      
    cy.contains("a", "Resend Activation Email").should("be.visible").click();
    cy.wait(1000);

    cy.contains("span", "Yes").should("be.visible").click();
    cy.wait(500);

    cy.get("div.alert.alert-dismissable.alert-info").should("be.visible").contains("The activation email has been sent");
  });

  it("can log into the mailserver and confirm the activation email was received", () => {
    cy.visit("http://localhost:8025");
    cy.wait(1000);

    cy.contains("button", "Inbox").click({ force: true });
    cy.wait(1000);

    cy.get("a.message")
        .filter(':contains("Welcome to your share incentive scheme portal")')
        .first()
        .click();
    cy.wait(500);

  });
});