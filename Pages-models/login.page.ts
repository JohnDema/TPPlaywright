import { type Page, expect, Locator } from "@playwright/test"
import Saucedemo_data from "../Saucedemo_data/data.json"

export default class    LoginPage {
    readonly    page: Page;
    readonly username_field : Locator;
    readonly password_field : Locator;
    readonly login_button : Locator

    constructor(page:Page){
    this.page= page;
    
    this.username_field = page.getByPlaceholder('Username');
    this.password_field = page.getByPlaceholder('Password');
    this.login_button = page.getByRole('button', { name: 'Login' });
}

//Se rendre sur la page de connexion//
async goToLoginPage(){
    await this.page.goto(Saucedemo_data.urlLoginPage);
}

//Se connecter avec un compte standard//
async loginUser(sample_user){
    await this.username_field.fill(sample_user)
    await this.password_field.fill(Saucedemo_data.password)
    await this.login_button.click()
}
}