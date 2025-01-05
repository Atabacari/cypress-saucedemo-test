/**
 * Class representing the Login Page.
 */
export class LoginPage {
    /**
     * Returns the username input field.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The username input field element.
     */
    fieldUserName() {
        const fieldUserName = cy.get('[data-test="username"]');
        fieldUserName.should('exist');
        return fieldUserName;
    }

    /**
     * Returns the password input field.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The password input field element.
     */
    fieldPassword() {
        const fieldPassword = cy.get('[data-test="password"]');
        fieldPassword.should('exist');
        return fieldPassword;
    }

    /**
     * Returns the login button.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The login button element.
     */
    buttonLogin() {
        const buttonLogin = cy.get('[data-test="login-button"]');
        buttonLogin.should('exist');
        return buttonLogin;
    }

    /**
     * Returns the error message element.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The error message element.
     */
    errorMessage() {
        const errorMessage = cy.get('[data-test="error"]');
        errorMessage.should('exist');
        return errorMessage;
    }

    /**
     * Types a username into the username input field.
     * @param {string} userName - The username to input.
     */
    inputUsername(userName) {
        this.fieldUserName().type(userName);
    }

    /**
     * Types a password into the password input field.
     * @param {string} password - The password to input.
     */
    inputPassword(password) {
        this.fieldPassword().type(password);
    }

    /**
     * Clicks the login button.
     */
    clickButtonLogin() {
        this.buttonLogin().click();
    }

    /**
     * Verifies that the current URL includes the expected URL.
     * @param {string} url - The expected URL to verify.
     */
    verifyExpextedUrl(url) {
        cy.url().should('include', url);
    }

    /**
     * Verifies that the error message text matches the expected value.
     * @param {string} errorText - The expected error message text.
     */
    verifyErrorMessage(errorText) {
        this.errorMessage().should('have.text', errorText);
    }

    /**
     * Logs in using credentials from a fixture file.
     * @param {string} userKey - The key of the user in the fixture file.
     */
    logIn(userKey) {
        cy.fixture('users').then((users) => {
            const user = users[userKey]; // Retrieve the user credentials
            this.inputUsername(user.username); // Input the username
            this.inputPassword(user.password); // Input the password
        });

        this.clickButtonLogin(); // Click the login button
    }
}

export const loginPage = new LoginPage();
