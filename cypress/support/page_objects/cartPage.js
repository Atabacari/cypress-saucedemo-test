import BasePage from "./basePage";
import { inventoryPage } from "./inventoryPage";

/**
 * Class representing the Cart Page.
 */
export class CartPage extends BasePage {



    // Locators block




    //Actions block

    verifyAllItemsInCart() {
        cy.get('@addedItems').then((addedItems) => {
            addedItems.forEach((itemName) => {
                this.isItemInCart(itemName);

            });
        });
    }

    isItemInCart(itemName) {

        this.inventoryItemElement('name').should('contain.text', itemName);

    }

    isNotItemInCart(itemName) {
        cy.get('[data-test="inventory-item"]').should('not.exist');
    }




}

export const cartPage = new CartPage();