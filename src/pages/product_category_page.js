/// <reference types="Cypress" />

import CommonPage from './commonPage'

export default class ProductCategoryPage extends CommonPage {

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
        cy.wait(3000)
        let xpathProduct = '//span[contains(text(),"' + productName +'")]'
        cy.xpath(xpathProduct).click()
        return this
    }

}