const { defineConfig } = require("cypress");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  projectId: "ffoabf",
  e2e: {
    specPattern: "e2e/**/*.cy.js",
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

          const email = faker.internet
            .email({ firstName: name, lastName: surname })
            .toLowerCase();

          return { name, surname, employee_id, email };
        },

        saveEmployeeFixture(employee) {
          const fixturesDir = path.join(config.projectRoot, "cypress", "fixtures");
          const filePath = path.join(fixturesDir, "employee.json");

          if (!fs.existsSync(fixturesDir)) {
            fs.mkdirSync(fixturesDir, { recursive: true });
          }

          fs.writeFileSync(filePath, JSON.stringify(employee, null, 2), "utf8");
          return filePath; // return something useful for debugging
        },
      });

      return config;
    },

    // you need to have your localhost server running before executing the tests
  },
});
