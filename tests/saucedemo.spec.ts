import { test, expect } from '@playwright/test';
import LoginPage from '../Pages-models/login.page';
import { InventoryPage } from '../Pages-models/inventory.page';
import CartPage from '../Pages-models/cart.page';
import CheckoutPage from '../Pages-models/checkout.page';
import RecapCheckoutPage from '../Pages-models/recap.checkout.page';
import BurgerButton from '../Pages-models/burger.button.page';
import Saucedemo_data from "../Saucedemo_data/data.json"
import DetailItemPage from '../Pages-models/detail.item.page';


// CAS DE TEST 1 //
test('Standard user can login and logout', async ({page})=>{

    const loginPage = new LoginPage(page);
    const burgerButton = new BurgerButton(page);
    
    await loginPage.goToLoginPage()
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled()
    await loginPage.loginUser(Saucedemo_data.userStandard)
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeEnabled()
    await burgerButton.logout()
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled()
})

// CAS DE TEST 2 //
test('locked user cant login and see error message', async ({page})=>{

    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage()
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled()
    await loginPage.loginUser(Saucedemo_data.userLocked)
    await expect(page.locator('//*[contains(text(),"Epic sadface: Sorry, this user has been locked out.")]')).toHaveText    
})

// CAS DE TEST 3 //
test('User can sort items by price, add items in his cart, type his information and finalize the order', async ({page})=>{
    
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const recapCheckoutPage = new RecapCheckoutPage(page);
    

    await loginPage.goToLoginPage()
    await loginPage.loginUser(Saucedemo_data.userStandard)
    await inventoryPage.sortItems(Saucedemo_data.highIntoLow)
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue(Saucedemo_data.highIntoLow);
    await inventoryPage.addItemsByPosition()
    await inventoryPage.goToCart()
    await expect(page.locator('//div/a/span[contains(@class, "shopping_cart_badge")]')).toHaveText(Saucedemo_data.twoItems)
    await cartPage.checkoutValidation()
    await checkoutPage.userInformations()
    await checkoutPage.validationUserInformation()
    await recapCheckoutPage.validationOrder()
    await expect(page.locator('//div/h2[contains(@class, "complete-header")]')).toHaveText(Saucedemo_data.messageValidationOrder)
})

// CAS DE TEST 4 //
test('User can sort items by price from the higher to the lower and vice versa', async ({page})=>{

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goToLoginPage()
    await loginPage.loginUser(Saucedemo_data.userStandard)
    await inventoryPage.sortItems(Saucedemo_data.highIntoLow)
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue(Saucedemo_data.highIntoLow);
    await inventoryPage.sortItems(Saucedemo_data.lowIntoHigh)
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue(Saucedemo_data.lowIntoHigh);
})

// CAS DE TEST 5 //
test('User can log, go to the second item, add it to his cart and see it on cart page', async ({page})=>{
    
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const detailItemPage = new DetailItemPage(page)
    
    await loginPage.goToLoginPage()
    await loginPage.loginUser(Saucedemo_data.userStandard)
    await inventoryPage.goToSecondItemPage()
    await expect(page.locator('//div[contains(@class, "inventory_details_name large_size")]')).toHaveText(Saucedemo_data.title)
    await expect(page.locator('//div[contains(@class, "inventory_details_price")]')).toHaveText(Saucedemo_data.price)
    await expect(page.locator('//div[contains(@class, "inventory_details_desc large_size")]')).toHaveText(Saucedemo_data.descritpion)
    await expect(page.locator('//div[contains(@class, "inventory_details_img")]')).toBeVisible()
    await detailItemPage.addToCartFromDetailPage()
    await expect(page.locator('//div/a/span[contains(@class, "shopping_cart_badge")]')).toHaveText(Saucedemo_data.oneItem)
    await detailItemPage.goToCartFromDetailPage()
    await expect(page.locator('[data-test= "item-quantity"]')).toHaveText(Saucedemo_data.oneItem)
})


