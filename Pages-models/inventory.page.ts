import { type Page, expect, Locator } from "@playwright/test"
import Saucedemo_data from "../Saucedemo_data/data.json"

export class    InventoryPage {
    readonly    page: Page;
    readonly selectBox: Locator;
    readonly choiceItem: Locator;
    readonly cartButton: Locator;
    readonly seeItem: Locator;



    constructor(page: Page){
        this.page= page;
        this.selectBox = page.locator('[data-test="product-sort-container"]')
        this.choiceItem = page.locator('//button[@class="btn btn_primary btn_small btn_inventory "]')
        this.cartButton = page.locator('//div/a[contains(@class,"shopping_cart_link")]')
        this.seeItem = page.locator('//div[contains(@class, "inventory_item_name ")]')
}

//Trier les items par prix//
async sortItems(sort_of){
    await this.selectBox.selectOption(sort_of);
}

//Ajouter les items selon leurs emplacement//
async addItemsByPosition(){
    await this.choiceItem.first().click()
    await this.choiceItem.nth(0).click()
}

//Se rendre dans le panier via le bouton cart//
async goToCart(){
    await this.cartButton.click()
}

//Se rendre sur le second item et voir les détails du produit sur sa page //
async goToSecondItemPage(){
    await this.seeItem.nth(1).click()
}
}