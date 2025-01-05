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

describe('Viewing Products tests', () => {
    it('should verify the product list is displayed after a successful login', () => {
        // Verify that the title is displayed correctly
        inventoryPage.verifyTitel();
        // Verify that inventory items are displayed
        inventoryPage.inventoryItem();
    });

    it('should ensure the presence of name, price, and description', () => {
        // Verify that each inventory item has a name
        inventoryPage.verifyOnEachCardPresenceOf('name');
        // Verify that each inventory item has a price
        inventoryPage.verifyOnEachCardPresenceOf('price');
        // Verify that each inventory item has a description
        inventoryPage.verifyOnEachCardPresenceOf('desc');
    });
});

describe('Product sorting tests', () => {
    const sorting = {
        byPriceAscending: 'Price (low to high)',
        byPriceDescending: 'Price (high to low)',
        byName_A_Z: 'Name (A to Z)',
        byName_Z_A: 'Name (Z to A)'
    };

    it('should verify sorting by name from Z to A', () => {
        // Select the sorting option for name from Z to A
        inventoryPage.selectSort(sorting.byName_Z_A);
        // Verify that the inventory items are sorted by name from Z to A
        inventoryPage.verifySortingName(sorting.byName_Z_A);
    });

    it('should verify sorting by name from A to Z', () => {
        // Select the sorting option for name from A to Z
        inventoryPage.selectSort(sorting.byName_A_Z);
        // Verify that the inventory items are sorted by name from A to Z
        inventoryPage.verifySortingName(sorting.byName_A_Z);
    });

    it('should verify sorting by price from low to high', () => {
        // Select the sorting option for price from low to high
        inventoryPage.selectSort(sorting.byPriceAscending);
        // Verify that the inventory items are sorted by price from low to high
        inventoryPage.verifySortingPrice(sorting.byPriceAscending);
    });

    it('should verify sorting by price from high to low', () => {
        // Select the sorting option for price from high to low
        inventoryPage.selectSort(sorting.byPriceDescending);
        // Verify that the inventory items are sorted by price from high to low
        inventoryPage.verifySortingPrice(sorting.byPriceDescending);
    });
});

describe('Adding products to the cart', () => {
    const expectedUrl = 'https://www.saucedemo.com/cart.html'; // Expected URL after successful items adding

    it('should add a single product to the cart and verify it in the cart', () => {
        // Add a single item to the cart
        inventoryPage.addItemToCart(0);
        // Go to the cart page
        inventoryPage.goToCart();
        // Verify that the URL matches the expected URL after adding items to the cart
        cartPage.verifyExpextedUrl(expectedUrl);
        // Verify that all items are in the cart
        cartPage.verifyAllItemsInCart();
    });

    it('should add multiple products to the cart and verify them in the cart', () => {
        // Add all items to the cart
        inventoryPage.addAllItemsToCart();
        // Go to the cart page
        inventoryPage.goToCart();
        // Verify that the URL matches the expected URL after adding items to the cart
        cartPage.verifyExpextedUrl(expectedUrl);
        // Verify that all items are in the cart
        cartPage.verifyAllItemsInCart();
    });


});
