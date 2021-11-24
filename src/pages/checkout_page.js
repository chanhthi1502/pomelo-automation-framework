/// <reference types="Cypress" />

import CommonPage from '../pages/commonPage'

export default class CheckoutPage extends CommonPage {

    /* 
        ##### This is method to choose category in Shop dropdown ####
        - Parameters:
          1. categoryName
    */

    verifyCheckOutPage(){
        cy.wait(3000)
        cy.get('.highlight-label').children().invoke('text').then((text) => {
            expect(text).to.equal("Shipping")
        })
        cy.get('.stepper-label').eq(1).children().invoke('text').then((text) => {
            expect(text).to.equal("Payment")
        })
        cy.get('.disable-label').children().invoke('text').then((text) => {
            expect(text).to.equal("Confirm")
        })
        return this
    }


}