import BasePage from "./basePage";

/**
 * Class representing the Inventory Page.
 */
export class InventoryPage extends BasePage {
    // Locators block

    /**
     * Returns the title element on the inventory page.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The title element.
     */
    titel() {
        const titel = cy.get('[data-test="title"]');
        titel.should('exist');
        return titel;
    }

    /**
     * Returns the product sort container element.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The product sort container element.
     */
    productSortContainer() {
        const productSortContainer = cy.get('[data-test="product-sort-container"]');
        productSortContainer.should('exist');
        return productSortContainer;
    }

    /**
     * Returns the "Add to cart" button for a specific inventory item.
     * @param {number} itemIndex - The index of the item.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The button element.
     */
    buttonAddToCart(itemIndex) {
        const buttonAddToCart = this.inventoryItem().eq(itemIndex).contains('button', 'Add to cart');
        buttonAddToCart.should('be.visible');
        return buttonAddToCart;
    }



    // Actions block

    /**
     * Adds all items on the inventory page to the cart.
     */
    addAllItemsToCart() {
        this.inventoryItem().each(($el, index) => {
            this.addItemToCart(index);
        });
    }

    /**
     * Clicks the "Add to cart" button for a specific item.
     * @param {number} itemIndex - The index of the item.
     */
    clickButtonAddToCart(itemIndex) {
        this.buttonAddToCart(itemIndex).click();
    }

    /**
     * Adds a specific item to the cart and saves its name in the addedItems alias.
     * @param {number} itemIndex - The index of the item to add.
     */
    addItemToCart(itemIndex) {
        const addedItems = [];
        this.getItemName(itemIndex).then((itemName) => {
            addedItems.push(itemName);
            cy.wrap(addedItems).as('addedItems');
            this.clickButtonAddToCart(itemIndex);
        });
    }

    /**
     * Verifies that each inventory item contains a specific element.
     * @param {string} element - The identifier of the element to check within each inventory item.
     */
    verifyOnEachCardPresenceOf(element) {
        this.inventoryItem().each(($item) => {
            cy.wrap($item).find(`[data-test="inventory-item-${element}"]`).should('exist');
        });
    }

    /**
     * Verifies the title text on the inventory page.
     */
    verifyTitel() {
        const expectedTitelText = 'Products';
        this.titel().should('have.text', expectedTitelText);
    }

    /**
     * Selects a sorting option from the product sort dropdown.
     * @param {string} sorting - The sorting option to select (e.g., 'Name (A to Z)', 'Price (low to high)').
     */
    selectSort(sorting) {
        this.productSortContainer().select(sorting);
    }

    /**
     * Verifies that inventory items are sorted by name.
     * @param {string} sorting - The sorting order ('Name (A to Z)' or 'Name (Z to A)').
     */
    verifySortingName(sorting) {
        this.inventoryItemElement('name').then((items) => {
            const itemNames = [];
            items.each((index, item) => {
                itemNames.push(item.innerText.trim());
            });

            let sortedItemNames;
            if (sorting === 'Name (Z to A)') {
                sortedItemNames = [...itemNames].sort().reverse();
            } else {
                sortedItemNames = [...itemNames].sort();
            }

            expect(itemNames).to.deep.equal(sortedItemNames);
        });
    }

    /**
     * Verifies that inventory items are sorted by price.
     * @param {string} sorting - The sorting order ('Price (low to high)' or 'Price (high to low)').
     */
    verifySortingPrice(sorting) {
        this.inventoryItemElement('price').then((priceElements) => {
            const itemPrices = [];
            priceElements.each((index, item) => {
                itemPrices.push(parseFloat(item.innerText.replace('$', '').trim()));
            });

            let sortedItemPrices;
            if (sorting === 'Price (high to low)') {
                sortedItemPrices = [...itemPrices].sort((a, b) => b - a);
            } else {
                sortedItemPrices = [...itemPrices].sort((a, b) => a - b);
            }

            expect(itemPrices).to.deep.equal(sortedItemPrices);
        });
    }
}

export const inventoryPage = new InventoryPage();
export default InventoryPage;
