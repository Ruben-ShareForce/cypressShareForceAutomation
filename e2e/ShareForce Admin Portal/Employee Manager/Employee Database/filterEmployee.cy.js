describe("Filter Employee Flow", () => {
  beforeEach(() => {
    cy.loginRoot();
  });

  it("can toggle the filter panel on and off", () => {
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
    cy.wait(1000);
    });

  it("can filter for existing employee/s using a random entity value", () => {
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
      cy.wait(1000);
    });

    it("can filter for existing employee/s using a random leavers (true/false) value", () => {
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
      cy.wait(1000);
    });

    it("can filter for existing employee/s using a random leave reason value", () => {
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
      cy.wait(1000);
    });

    it("can filter for existing employee/s using a random account status value", () => {
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
      cy.wait(1000);
    });

    it("can filter for existing employee/s using a random users with email (true/false) value", () => {
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
      cy.wait(1000);
    });

    it("can filter for existing employee/s using a random is director (true/false) value", () => {
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
      cy.wait(1000);
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
      cy.wait(1000);
    });

    it("can filter for existing employee/s using a random combination of all filters", () => {
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

      const randomSelect = (selector, { includeEmpty = true } = {}) => {
        cy.get(selector)
          .should("be.visible")
          .find("option")
          .then(($options) => {
            let values = [...$options].map(o => o.value);

            if (!includeEmpty) values = values.filter(v => v !== "");

            const randomValue = values[Math.floor(Math.random() * values.length)];

            cy.get(selector).select(randomValue);
            cy.log(`${selector} => ${randomValue === "" ? "(empty/default)" : randomValue}`);
          });
      };

      const filters = [
        "#id_entity",
        "#id_leavers",
        "#id_reason_for_leaving",
        "#id_account_status",
        "#id_no_email",
        "#id_is_director",
        "#id_has_awards",
      ];

      const runs = 10;

      Cypress._.times(runs, (i) => {
        cy.log(`Run ${i + 1}/${runs}`);

        filters.forEach((sel) => randomSelect(sel, { includeEmpty: true }));

        cy.wait(500);
        cy.get("button[type='submit'][class='btn btn-sf-lightblue pull_right']").should("be.visible").click();
        cy.wait(1000);

        cy.get("body").then(($body) => {
          if ($body.find("#list_table").length) {
            cy.get("#list_table").should("be.visible");
          } else {
            cy.get(".sf-box-inner").should("be.visible");
          }
        });

        cy.get(
          "input[type='button'][class='btn btn-sf-lightblue pull_right'][onclick=\"location.href='/app/employees/';\"]"
        )
          .should("be.visible")
          .click();

        cy.get("button[data-toggle='collapse'][data-target='#collapseOne']").should("be.visible").click();
      });
    });
});