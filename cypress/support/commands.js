// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />

Cypress.Commands.add('openHomePage', () => {
    cy.visit('/', { failOnStatusCode: true });
})

Cypress.Commands.add('clearState', () => {
    // Clear cookies and local storage to ensure a clean state
    cy.clearCookies();
    cy.clearLocalStorage();
})
// Intercept network requests to the specified URL and mock a successful response
Cypress.Commands.add('interceptMock', () => {
    cy.intercept('POST', 'https://events.backtrace.io/api/**', {
        statusCode: 200, // Mock a successful status code
        body: { success: true } // Provide a mocked response body
    }).as('mockBacktrace'); // Alias the request for easier reference in tests


})

