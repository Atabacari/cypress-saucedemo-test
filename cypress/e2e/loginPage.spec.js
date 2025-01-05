// Import the page object for login functionalities
import { basePage } from "../support/page_objects/basePage";
import { loginPage } from "../support/page_objects/loginPage";

// Runs before each test in the suite
beforeEach('Open the page', () => {

    // Intercept network requests to the specified URL and mock a successful response
    cy.interceptMock();
    // Navigate to the homepage of the application
    cy.openHomePage();
});

// Test suite for authorization functionality
describe('Authorization tests', () => {

    // Test case: Valid username and password
    it('should log in with a valid username and password', () => {
        const userKey = 'standard_user'; // Key for retrieving the correct user data from fixtures
        const expectedUrl = 'https://www.saucedemo.com/inventory.html'; // Expected URL after successful login

        loginPage.logIn(userKey);  // Load user data from the fixture file
        loginPage.verifyExpextedUrl(expectedUrl); // Verify the user is redirected to the expected URL
    });

    // Test case: Invalid username
    it('should log in with an incorrect username', () => {
        const userKey = 'incorrect_user'; // Key for retrieving the incorrect user data
        const expectedUrl = 'https://www.saucedemo.com/'; // Expected URL after failed login
        const errorText = 'Epic sadface: Username and password do not match any user in this service';


        loginPage.logIn(userKey);  // Load user data from the fixture file
        // Verify the user remains on the same page due to failed login
        basePage.verifyExpextedUrl(expectedUrl);
        // Verify an error message is displayed
        loginPage.verifyErrorMessage(errorText);

    });

    // Test case: Invalid password
    it('should log in with an incorrect password', () => {
        const userKey = 'incorrect_pass'; // Key for retrieving the user data with incorrect password
        const expectedUrl = 'https://www.saucedemo.com/'; // Expected URL after failed login
        const errorText = 'Epic sadface: Username and password do not match any user in this service';

        loginPage.logIn(userKey);  // Load user data from the fixture file
        // Verify the user remains on the same page due to failed login
        basePage.verifyExpextedUrl(expectedUrl);
        // Verify an error message is displayed
        loginPage.verifyErrorMessage(errorText);


    });

    // Test case: Empty username and password fields
    it('should log in with empty fields', () => {
        const userKey = 'empty_user_pass'; // Key for retrieving the user data with empty fields
        const expectedUrl = 'https://www.saucedemo.com/'; // Expected URL after failed login
        const errorText = 'Epic sadface: Username and password do not match any user in this service';

        loginPage.logIn(userKey);  // Load user data from the fixture file
        // Verify the user remains on the same page due to failed login
        basePage.verifyExpextedUrl(expectedUrl);
        // Verify an error message is displayed
        loginPage.verifyErrorMessage(errorText);

    });
    // Test case: The user is blocked
    it('should attempt to log in with a blocked user', () => {
        const userKey = 'locked_out_user'; // Key for retrieving the blocked user data 
        const expectedUrl = 'https://www.saucedemo.com/'; // Expected URL after failed login
        const errorText = 'Epic sadface: Sorry, this user has been locked out.';

        loginPage.logIn(userKey);  // Load user data from the fixture file
        // Verify the user remains on the same page due to failed login
        basePage.verifyExpextedUrl(expectedUrl);
        // Verify an error message is displayed
        loginPage.verifyErrorMessage(errorText);


    });



});
