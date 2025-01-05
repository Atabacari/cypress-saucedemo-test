

export class BasePage {
    // Locators block

    /**
     * Returns the shopping cart icon element.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The shopping cart icon element.
     */
    iconCart() {
        const iconCart = cy.get('[data-test="shopping-cart-link"]');
        iconCart.should('exist');
        return iconCart;
    }

    iconCartCount() {
        return cy.get('[data-test="shopping-cart-badge"]');
    }

    /**
     * Returns all inventory item elements.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} All inventory item elements.
     */
    inventoryItem() {
        const inventoryItem = cy.get('[data-test="inventory-item"]');
        inventoryItem.should('exist');
        return inventoryItem;
    }

    /**
     * Returns a specific inventory item element based on the given identifier.
     * @param {string} element - The identifier for the inventory item.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The specific inventory item element.
     */
    inventoryItemElement(element) {
        const inventoryItemElement = this.inventoryItem().find(`[data-test="inventory-item-${element}"]`);
        inventoryItemElement.should('exist');
        return inventoryItemElement;
    }

    /**
     * Returns the "Remove" button for a specific inventory item.
          * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The button element.
     */
    buttonRemove() {
        // const buttonRemove = cy.get('[data-test="remove-sauce-labs-backpack"]');
        const buttonRemove = cy.get('button').contains('Remove');

        buttonRemove.should('be.visible');
        return buttonRemove;
    }



    // Actions block

    verifyCartItemCount(expectedCount) {
        this.iconCartCount().should('have.text', expectedCount);
    }

    verifyCartIsEmpty() {
        this.iconCartCount().should('not.exist');

    }

    /**
     * Clicks the shopping cart icon.
     */
    clickIconCart() {
        this.iconCart().click();
    }

    /**
     * Navigates to the shopping cart page by clicking the cart icon.
     */
    goToCart() {
        this.clickIconCart();
    }

    /**
     * Verifies that the current URL includes the expected value.
     * @param {string} url - The expected URL fragment to verify.
     */
    verifyExpextedUrl(url) {
        cy.url().should('include', url);
    }

    /**
     * Returns the name of an inventory item by its index.
     * @param {number} index - The index of the inventory item.
     * @returns {Cypress.Chainable<string>} The name of the inventory item.
     */
    getItemName(index) {
        return this.inventoryItemElement('name').eq(index).invoke('text');
    }

    removeProduct() {
        this.buttonRemove().click();

    }


}

export const basePage = new BasePage();

export default BasePage;
