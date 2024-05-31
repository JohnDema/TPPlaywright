import { type Page, expect, Locator } from "@playwright/test"
import Saucedemo_data from "../Saucedemo_data/data.json"
export default class    CheckoutPage {
    readonly    page: Page;
    readonly firstName_field: Locator;
    readonly lastName_field: Locator;
    readonly postalCode_field: Locator;
    readonly checkout_button: Locator;



constructor(page:Page){
    this.page= page;
    this.firstName_field = page.getByPlaceholder('First Name');
    this.lastName_field = page.getByPlaceholder('Last Name');
    this.postalCode_field = page.getByPlaceholder('Zip/Postal Code');
    this.checkout_button = page.getByRole('button', { name: 'continue' });

}
//Remplissage des informations utilisateurs//
async userInformations(){
    await this.firstName_field.fill(Saucedemo_data.firstName)
    await this.lastName_field.fill(Saucedemo_data.lastName)
    await this.postalCode_field.fill(Saucedemo_data.codePostal)
}
//Valide les informations utilisateurs//
async validationUserInformation(){
    await this.checkout_button.click()
}

}
