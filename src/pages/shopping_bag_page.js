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

    get promoCodeInput(){
        cy.log("get promo code input element")
        return this.getElement(this.eleYml.EnterPromoCode_input)
    }

    get applyPromoCodeButton(){
        cy.log("get promo code button element")
        return this.getElement(this.eleYml.ApplyPromoCode_button)
    }

    get emptyBagTitle(){
        cy.log("get empty bag element")
        return this.getElement(this.eleYml.EmptyBag_title)
    }

    get shopNowButton(){
        cy.log("get shop now element")
        return this.getElement(this.eleYml.ShopNow_button)
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
        ##### This is method to Verify Empty Shopping Bag ####
        - Parameters:
          1. None
    */

    verifyEmptyShoppingBag(){
        this.emptyBagTitle.invoke('text').then((text) => {
            expect(text).to.equal('Your Bag is Empty')
        })
    
        this.shopNowButton.invoke('text').then((text) => {
            expect(text).to.equal('SHOP NOW')
        })
    
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
        cy.wait(3000)
        this.sizeDropDown.select(size)
        return this
    }

    /* 
        ##### This is method to remove items in Shopping Bag ####
        - Parameters:
          1. None
    */

    removeProductFromCart(){
        cy.wait(3000)
        this.removeProductButton.click()
        return this
    }

    /* 
        ##### This is method to apply promo Code in Shopping Bag ####
        - Parameters:
          1. promoCode
    */
    applyPromoCode(promoCode){
        this.promoCodeInput.click()
        this.promoCodeInput.type(promoCode)
        this.applyPromoCodeButton.click()
        return this
    }

    /* 
        ##### This is method to verify invalid promo Code message in Shopping Bag ####
        - Parameters:
          1. None
    */
    verifyInvalidPromoCode(){
        cy.get('.pomelo-snack-bar__content').children().invoke('text').then((text) => {
            expect(text).to.equal("Invalid voucher code")
        })

        return this
    }

    /* 
        ##### This is method to verify proceed to checkout button in Shopping Bag ####
        - Parameters:
          1. None
    */
    verifyProceedToCheckOutButton(){
        cy.get('.cart-checkout-button').children().invoke('text').then((text) => {
                expect(text).to.equal("proceed to Checkout")
        })
        return this
    }

    checkOut(){
        cy.get('.cart-checkout-button').click()
        cy.url().should('include', '/checkout')
        return this
    }



}