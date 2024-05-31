import { type Page, expect, Locator } from "@playwright/test"
import Saucedemo_data from "../Saucedemo_data/data.json"
export default class    CartePage {
    readonly    page: Page;
    readonly buttonValidation: Locator;

constructor(page:Page){
    this.page= page;
    this.buttonValidation = page.locator('//button[@id="checkout"]')
}


//Récupère le nombre d'item dans le panier via le logo sur le bouton cart et valide le checkout//
async checkoutValidation(){
    await this.buttonValidation.click()

}

}