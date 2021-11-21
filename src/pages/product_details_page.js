/// <reference types="Cypress" />

import CommonPage from '../pages/commonPage'

export default class ProductDetailsPage extends CommonPage {

    get addToBagButton(){
        cy.log("get Add To Bag button element")
        return this.getElement(this.eleYml.AddToBag_button)
    }
    
    addToBag(size){
        cy.wait(3000)
        let xpathSize = '//button[@class="button pdp__options-item" and text() = "'+size+'"]'
        cy.get('.pdp__options-container').then($option => {
            if($option.find('.button pdp__options-item').length > 0){
                cy.xpath(xpathSize).click({force: true})
            }
        })
        this.addToBagButton.click({force: true})
        return this
    }

}