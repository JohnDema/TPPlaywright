import { type Page, expect, Locator } from "@playwright/test"
import Saucedemo_data from "../Saucedemo_data/data.json"
export default class    RecapCheckoutPage {
    readonly    page: Page;
    readonly finishButton: Locator;
 

constructor(page:Page){
    this.page= page;
    this.finishButton = page.getByRole('button', { name: 'Finish' });
 
}

//Validation de la commande sur la page récapitulative//
async   validationOrder(){
    await  this.finishButton.click()
}
}