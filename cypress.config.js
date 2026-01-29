const { defineConfig } = require("cypress");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  projectId: "ffoabf",
  e2e: {
    specPattern: "e2e/**/*.cy.js",
    fixturesFolder: "fixtures",
    supportFile: "support/e2e.js",
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "http://127.0.0.1:8000/",

    setupNodeEvents(on, config) {
      on("task", {
        generateEmployee() {
          const name = faker.person.firstName();
          const surname = faker.person.lastName();
          const employee_id = `CYP${Date.now()}${faker.number.int({ min: 100, max: 999 })}`;
          const email = faker.internet.email({ firstName: name, lastName: surname }).toLowerCase();
          return { name, surname, employee_id, email };
        },

        generateEntity() {
          const name = `CYP ${Date.now()} ${faker.company.name()}`.slice(0, 90);

          const region = faker.location.state().slice(0, 50);
          const company_code = faker.string.alphanumeric({ length: { min: 4, max: 10 } }).toUpperCase();
          const business_unit = faker.commerce.department().slice(0, 100);
            let group = faker.company.name().trim().slice(0, 100);
            group = group.charAt(0).toUpperCase() + group.slice(1);

          return { name, region, company_code, business_unit, group };
        },

        ensureDir({ dir }) {
          const abs = path.isAbsolute(dir) ? dir : path.join(config.projectRoot, dir);
          fs.mkdirSync(abs, { recursive: true });
          return abs;
        },
      });

      return config;
    },
  },
});
