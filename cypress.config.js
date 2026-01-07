const { defineConfig } = require("cypress");
// const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  projectId: "ffoabf",
  e2e: {
    specPattern: "e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // point to existing support file in project root
    supportFile: 'support/e2e.js',
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "http://127.0.0.1:8000/",
    // you need to have your localhost server running before executing the tests
  },
});
