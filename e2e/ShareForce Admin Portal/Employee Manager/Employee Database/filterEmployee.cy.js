describe("Filter Employee Flow", () => {
  beforeEach(() => {
    cy.loginRoot();
  });

  it.skip("can toggle the filter panel on and off", () => {
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

    cy.get("h2.normalize").should("be.visible");
    cy.wait(1000);

    cy.get("input[type='button'][class='btn btn-sf-lightblue pull_right'][onclick=\"location.href='/app/employees/';\"]").should("be.visible");

    });

  it.skip("can filter for existing employee/s using a random entity value", () => {
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

      cy.get("#id_entity")
        .should("be.visible")
        .find("option")
        .then(($options) => {
            const values = [...$options].map(o => o.value);

            const randomValue = values[Math.floor(Math.random() * values.length)];
            cy.get("#id_entity").select(randomValue);
        });

      cy.wait(500);
      cy.get("button[type='submit'][class='btn btn-sf-lightblue pull_right']")
        .should("be.visible")
        .click();

    });

    it.skip("can filter for existing employee/s using a random leavers (true/false) value", () => {
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

      cy.get("#id_leavers")
        .should("be.visible")
        .find("option")
        .then(($options) => {
            const values = [...$options].map(o => o.value);

            const randomValue = values[Math.floor(Math.random() * values.length)];
            cy.get("#id_leavers").select(randomValue);
        });

      cy.wait(500);
      cy.get("button[type='submit'][class='btn btn-sf-lightblue pull_right']")
        .should("be.visible")
        .click();

    });

    it.skip("can filter for existing employee/s using a random leave reason value", () => {
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

      cy.get("#id_reason_for_leaving")
        .should("be.visible")
        .find("option")
        .then(($options) => {
            const values = [...$options].map(o => o.value);

            const randomValue = values[Math.floor(Math.random() * values.length)];
            cy.get("#id_reason_for_leaving").select(randomValue);
        });

      cy.wait(500);
      cy.get("button[type='submit'][class='btn btn-sf-lightblue pull_right']")
        .should("be.visible")
        .click();

    });

    it.skip("can filter for existing employee/s using a random account status value", () => {
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
        .find("option")
        .then(($options) => {
            const values = [...$options].map(o => o.value);

            const randomValue = values[Math.floor(Math.random() * values.length)];
            cy.get("#id_account_status").select(randomValue);
        });

      cy.wait(500);
      cy.get("button[type='submit'][class='btn btn-sf-lightblue pull_right']")
        .should("be.visible")
        .click();

    });

    it.skip("can filter for existing employee/s using a random users with email (true/false) value", () => {
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

      cy.get("#id_no_email")
        .should("be.visible")
        .find("option")
        .then(($options) => {
            const values = [...$options].map(o => o.value);

            const randomValue = values[Math.floor(Math.random() * values.length)];
            cy.get("#id_no_email").select(randomValue);
        });

      cy.wait(500);
      cy.get("button[type='submit'][class='btn btn-sf-lightblue pull_right']")
        .should("be.visible")
        .click();

    });

    it.skip("can filter for existing employee/s using a random is director (true/false) value", () => {
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

      cy.get("#id_is_director")
        .should("be.visible")
        .find("option")
        .then(($options) => {
            const values = [...$options].map(o => o.value);

            const randomValue = values[Math.floor(Math.random() * values.length)];
            cy.get("#id_is_director").select(randomValue);
        });

      cy.wait(500);
      cy.get("button[type='submit'][class='btn btn-sf-lightblue pull_right']")
        .should("be.visible")
        .click();

    });

    it("can filter for existing employee/s using a random has awards (true/false) value", () => {
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

      cy.get("#id_has_awards")
        .should("be.visible")
        .find("option")
        .then(($options) => {
            const values = [...$options].map(o => o.value);

            const randomValue = values[Math.floor(Math.random() * values.length)];
            cy.get("#id_has_awards").select(randomValue);
        });

      cy.wait(500);
      cy.get("button[type='submit'][class='btn btn-sf-lightblue pull_right']")
        .should("be.visible")
        .click();

    });

});