import { type Page, expect, Locator } from "@playwright/test"
import Saucedemo_data from "../Saucedemo_data/data.json"
export default class    DetailItemPage {
    readonly    page: Page;
    readonly title: Locator;
    readonly price: Locator;
    readonly description: Locator;
    readonly image: Locator;
    readonly addToCart: Locator;
    readonly goToCart: Locator;

constructor(page:Page){
    this.page= page;
    this.title = page.locator('//div[contains(@class, "inventory_details_name large_size")]')
    this.price = page.locator('//div[contains(@class, "inventory_details_price")]')
    this.description = page.locator('//div[contains(@class, "inventory_details_desc large_size")]')
    this.image = page.locator('//div[contains(@class, "inventory_details_img")]')
    this.addToCart = page.getByRole('button', { name: 'Add to cart' });
    this.goToCart = page.locator('//div/a[contains(@class,"shopping_cart_link")]')

    
}

//Permet d'ajouter un item depuis la page détail du produit//
async addToCartFromDetailPage(){
    await this.addToCart.click()
}
//Permet de se rendre dans le panier depuis la page détail d'un produit//
async goToCartFromDetailPage(){
    await this.goToCart.click()

}

}