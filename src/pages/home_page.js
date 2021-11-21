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

    get shopDropDown(){
        cy.log("get Shop Drop Down element")
        return this.getElement(this.eleYml.Shop_DropDown)
    }

    /* 
        ##### This is method to click Shopping Bag icon in header ####
        - Parameters:
          1. None
    */
    clickShoppingBag(){
        this.shoppingBagButton.click()
        return this
    }

    /* 
        ##### This is method to choose category in Shop dropdown ####
        - Parameters:
          1. categoryName
    */

    chooseCategory(categoryName){
        this.shopDropDown.click({multiple: true})
        cy.contains(categoryName).click()
        return this
    }


}