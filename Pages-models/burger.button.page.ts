import { type Page, expect, Locator } from "@playwright/test"
import Saucedemo_data from "../Saucedemo_data/data.json"

export default class    BurgerButton {
    readonly    page: Page;
    readonly burger_button: Locator
    readonly logout_button: Locator

constructor(page:Page){
    this.page= page;
    this.burger_button = page.getByRole('button', { name: 'Open Menu' });
    this.logout_button = page.getByText('Logout');
}

//Se déconnecter//
async logout(){
    await this.burger_button.click()
    //await expect(this.page.getByText('Logout')).toBeEnabled()
    await this.logout_button.click()
    //await expect(this.page.getByRole('button', { name: 'Login' })).toBeEnabled()
}




}
