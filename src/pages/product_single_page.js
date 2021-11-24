/// <reference types="Cypress" />

import CommonPage from './commonPage'

export default class ProductSinglePage extends CommonPage {

    get addToBagButton(){
        cy.log("get Add To Bag button element")
        return this.getElement(this.eleYml.AddToBag_button)
    }

    /* 
        ##### This is method to add product in bag with items ####
        - Parameters:
          1. size
    */
    
    addToBag(size){
        cy.wait(3000)
        let xpathSize = '//button[contains(@class,"button pdp__options-item") and text() = "'+size+'"]'
        /* To check if Size button is enable, if yes and then choose size, if not countinue*/
        cy.get('.pdp__options-container').then($option => {
            cy.log("find options")
            if($option.find('.pdp__options-item').length > 0){
                cy.log(xpathSize)
                cy.xpath(xpathSize).click({force: true})
            }

        })
        this.addToBagButton.click({force: true})
        return this
    }

}