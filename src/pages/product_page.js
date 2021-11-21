/// <reference types="Cypress" />

import CommonPage from '../pages/commonPage'

export default class ProductPage extends CommonPage {

    get product(){
        cy.log("get product element")
        return this.getElement(this.eleYml.Product)
    }
    
    /* 
        ##### This is method to choose Product with product name ####
        - Parameters:
          1. productName
    */
    chooseProduct(productName){
        let xpathProduct = '//span[contains(text(),"' + productName +'")]'
        cy.xpath(xpathProduct).click()
        return this
    }

}