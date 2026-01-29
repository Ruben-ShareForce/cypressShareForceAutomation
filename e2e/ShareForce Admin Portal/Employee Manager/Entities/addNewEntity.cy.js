let entityFixture;

describe("Add Entity Flow", () => {
  before(() => {
    cy.generateEntityFixture().then((generated) => {
      cy.fixture("countryCurrencyMapping").then((mapping) => {
        const pair = mapping[Math.floor(Math.random() * mapping.length)];

        entityFixture = {
          ...generated,
          country_id: String(pair.country_id),
          country: pair.country,
          currency_id: String(pair.currency_id),
          currency_code: pair.currency_code,
          currency_name: pair.currency_name,
        };

        cy.log(`Generated Entity Fixture: ${JSON.stringify(entityFixture)}`);
      });
    });
  });

  beforeEach(() => {
    cy.loginRoot();
    cy.wait(1000);
  });

  it("can add a new entity successfully", () => {
    cy.visit("/");
    cy.wait(500);

    cy.get("body").then(($body) => {
      if ($body.find("#djHideToolBarButton:visible").length) {
        cy.get("#djHideToolBarButton").click();
      }
    });

    cy.get("a[href='/app/employees/']").should("be.visible").click();
    cy.wait(500);

    cy.get("a[href='/app/employees/entity/list/']").should("be.visible").click();
    cy.wait(500);

    cy.get("a[href='/app/employees/entity/create/']").should("be.visible").click();
    cy.wait(1000);

    cy.get("#id_name").should("be.visible").clear().type(entityFixture.name);

    cy.get("#id_currency").should("be.visible").select(entityFixture.currency_id);
    cy.get("#id_country").should("be.visible").select(entityFixture.country_id);

    cy.get("#id_region").clear().type(entityFixture.region);
    cy.get("#id_company_code").clear().type(entityFixture.company_code);
    cy.get("#id_business_unit").clear().type(entityFixture.business_unit);
    cy.get("#id_group").clear().type(entityFixture.group);

    cy.get("#id_country option:selected").should("contain.text", entityFixture.country);
    cy.get("#id_currency option:selected").should("contain.text", entityFixture.currency_code);
    cy.wait(500);

    cy.contains("button", "Save Entity")
      .scrollIntoView()
      .should("be.visible")
      .click();
  });
});
