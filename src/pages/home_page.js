/// <reference types="Cypress" />

import CommonPage from '../pages/commonPage'

export default class HomePage extends CommonPage {

    route = {
        baseURL : 'https://www.pomelofashion.com/th/en/'
    }

    go(){
        cy.visit(`${this.route.baseURL}`)
        return this
    }

    get shoppingBagButton(){
        cy.log("get Shopping Bag button element")
        return this.getElement(this.eleYml.ShoppingBag_Button)
    }

    clickShoppingBag(){
        this.shoppingBagButton.click()
        return this
    }


}