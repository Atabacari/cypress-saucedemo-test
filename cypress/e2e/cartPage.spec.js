// Import the page object for login functionalities
import { loginPage } from "../support/page_objects/loginPage";
import { inventoryPage } from "../support/page_objects/inventoryPage";
import { basePage } from "../support/page_objects/basePage";
import { cartPage } from "../support/page_objects/cartPage";



// Runs before each test in the suite
beforeEach('Open the page', () => {
    const userKey = 'standard_user'; // Key for retrieving the correct user data from fixtures
    const expectedUrl = 'https://www.saucedemo.com/inventory.html'; // Expected URL after successful login

    // Intercept network requests to the specified URL and mock a successful response
    cy.interceptMock();
    // Navigate to the homepage of the application
    cy.openHomePage();
    // Log in to the application using the specified user key
    loginPage.logIn(userKey);
    // Verify that the URL matches the expected URL after successful login
    basePage.verifyExpextedUrl(expectedUrl);



});

describe('Removing products from the cart', () => {

    beforeEach(() => {
        // Add a single item to the cart
        inventoryPage.addItemToCart(0);


    })

    it('Remove a product from the cart page', () => {
        const expectedUrl = 'https://www.saucedemo.com/cart.html'; // Expected URL after successful items adding  

        // Go to the cart page
        inventoryPage.goToCart();
        // Verify that the URL matches the expected URL after adding items to the cart
        cartPage.verifyExpextedUrl(expectedUrl);
        // Remove the product from the cart
        cartPage.removeProduct();
        // Verify than the cart is empty
        cartPage.isNotItemInCart();

    });

    it('Remove a product from the product list.', () => {

        const expectedUrl = 'https://www.saucedemo.com/cart.html'; // Expected URL after successful items adding

        // Verify that the button "Remove" is visible
        inventoryPage.removeProduct();
        // Go to the cart page
        inventoryPage.goToCart();
        // Verify that the URL matches the expected URL after adding items to the cart
        cartPage.verifyExpextedUrl(expectedUrl);
        // Verify than the cart is empty
        cartPage.isNotItemInCart();

    })

});

describe('Cart icon verification', () => {
    it('Ensure the product count in the cart icon updates after adding/removing items', () => {
        // Add the first item to the cart
        inventoryPage.verifyCartIsEmpty()
        inventoryPage.addItemToCart(0);
        inventoryPage.verifyCartItemCount(1);
        inventoryPage.addItemToCart(1);
        inventoryPage.verifyCartItemCount(2);
        inventoryPage.removeProduct();
        inventoryPage.verifyCartItemCount(1);
        inventoryPage.removeProduct();
        inventoryPage.verifyCartIsEmpty();

    });

})