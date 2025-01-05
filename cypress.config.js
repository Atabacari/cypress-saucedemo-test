const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    baseUrl: 'https://www.saucedemo.com/',
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    browser: 'electron',
    pageLoadTimeout: 12000,
    chromeWebSecurity: false,
    testIsolation: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
