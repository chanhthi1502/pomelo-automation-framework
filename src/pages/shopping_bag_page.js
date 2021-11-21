/// <reference types="Cypress" />

import CommonPage from '../pages/commonPage'

export default class ShoppingBagPage extends CommonPage {

    get shoppingBagTitle(){
        cy.log("get Shopping Bag button element")
        return this.getElement(this.eleYml.MyShoppingBag_Title)
    }

    get quantityDropDown(){
        cy.log("get Quantity Dropdown element")
        return this.getElement(this.eleYml.Quantity_DropDown)
    }

    get sizeDropDown(){
        cy.log("get Size Dropdown element")
        return this.getElement(this.eleYml.Size_DropDown)
    }

    get viewShoppingBagButton(){
        cy.log("get View Shopping Bag element")
        return this.getElement(this.eleYml.ViewMyShoppingBag_Button)
    }

    get productName(){
        cy.log("get product name element")
        return this.getElement(this.eleYml.ProductName_label)
    }

    get removeProductButton(){
        cy.log("get remove product element")
        return this.getElement(this.eleYml.RemoveProduct_button)
    }

    /* 
        ##### This is method to View My Shopping Bag button ####
        - Parameters:
          1. None
    */

    viewMyShoppingBag(){
        this.viewShoppingBagButton.click()
        return this
    }

    /* 
        ##### This is method to Verify Shopping Bag details ####
        - Parameters:
          1. expectedTitleShoppingBag
    */

    verifyShoppingBag(expectedTitleShoppingBag,expectedProductName,expectedSize,expectedQuantity){
        this.shoppingBagTitle.invoke('text').then((text) => {
            expect(text).to.equal(expectedTitleShoppingBag)
        })

        this.productName.invoke('text').then((text) => {
            expect(text).to.equal(expectedProductName)
        })

        //this.sizeDropDown.should('have.value',expectedSize)

        //this.quantityDropDown.should('have.value',expectedQuantity)

        return this
    }

    /* 
        ##### This is method to adjust quantity of items in Shopping Bag ####
        - Parameters:
          1. quantityNumber
    */
    
    adjustQuantityShoppingBag(quantityNumber){
        this.quantityDropDown.select(quantityNumber)
        return this
    }

    /* 
        ##### This is method to adjust size of items in Shopping Bag ####
        - Parameters:
          1. size
    */

    adjustSizeShoppingBag(size){
        this.sizeDropDown.select(size)
        return this
    }

     /* 
        ##### This is method to remove items in Shopping Bag ####
        - Parameters:
          1. None
    */

    removeProductFromCart(){
        this.removeProductButton.click()
        return this
    }



}