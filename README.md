# Saucedemo Cypress Tests

This project includes automated tests for the [Saucedemo](https://www.saucedemo.com) website using Cypress. The tests cover various aspects of the site, including login functionality, product sorting, adding products to the cart, and checking the cart.
 
## Installation

To get started with the project, clone the repository and install the dependencies.

```sh
git clone https://github.com/Atabacari/cypress-saucedemo-test
cd cypress-saucedemo-test
npm install
```

## Project Structure

The project is organized as follows:

cypress/

   fixtures/: Test data.

   e2e/: Test scenarios.

## Running Tests
To run all tests, use the following command:

```sh
npx cypress open
```

## Test Cases

### Login Tests
- **Successful login with correct credentials**: Verify that a user can successfully log in with the correct credentials.

- **Unsuccessful login with incorrect password**: Verify that an appropriate error message appears when an incorrect password is entered.

- **Unsuccessful login with incorrect username**: Verify that an appropriate error message appears when an incorrect username is entered.

- **Unsuccessful login without username and password**: Verify that an appropriate error message appears when the username and password are not entered.

- **Account lockout logic**: Verify that a user is locked out after multiple failed login attempts.

### Inventory Page Tests
- **Display of all products**: Verify that all products are displayed on the inventory page.

- **Check for product name, price, and description**: Ensure that each product has a name, price, and description.

- **Filter products by price (ascending/descending)**: Verify that products are sorted by price correctly.

- **Filter products by name (A-Z/Z-A)**: Verify that products are sorted by name correctly.

### Cart Page Tests
- **Add a single product to the cart**: Verify that a product is correctly added to the cart.

- **Add multiple products to the cart**: Verify that multiple products are correctly added to the cart.

- **Check the cart item count display**: Verify that the correct number of items is displayed on the cart icon.

- **Remove a product from the cart**: Verify that a product is correctly removed from the cart.

- **Check the contents of the cart**: Ensure that all added products are displayed in the cart.

### Checkout Page Tests
- **Successful order placement with correct data**: Verify that an order can be successfully placed with the correct data.

- **Unsuccessful order placement without data**: Verify that an appropriate error message appears when data is not entered.

- **Check the correctness of order information**: Verify that the order information, including products and prices, is displayed correctly.

### General Functionality Tests
- **Check the logout button**: Verify that the user can successfully log out.

- **Check the home button**: Verify that the user can return to the home page from any other page.

- **Check menu navigation**: Ensure that all menu links work correctly.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
