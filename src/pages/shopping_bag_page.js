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

    viewMyShoppingBag(){
        this.viewShoppingBagButton.click()
        return this
    }

    verifyShoppingBag(expectedTitleShoppingBag){
        this.shoppingBagTitle.invoke('text').then((text) => {
            expect(text).to.equal(expectedTitleShoppingBag)
        })
        return this
    }
    
    adjustQuantityShoppingBag(quantityNumber){
        this.quantityDropDown.select(quantityNumber)
        return this
    }

    adjustSizeShoppingBag(size){
        this.sizeDropDown.select(size)
        return this
    }

}