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

    get shoppingBagTitle(){
        cy.log("get Shopping Bag button element")
        return this.getElement(this.eleYml.MyShoppingBag_Title)
    }

    clickShoppingBag(){
        this.shoppingBagButton.click()
        return this
    }

    verifyShoppingBag(expectedTitleShoppingBag){
        this.shoppingBagTitle.invoke('text').then((text) => {
            expect(text).to.equal(expectedTitleShoppingBag)
        })
        return this
    }


}