/// <reference types="Cypress" />

import CommonPage from '../pages/commonPage'

export default class ProductPage extends CommonPage {

    /*route = {
        baseURL : 'https://www.pomelofashion.com/th/en/clothes/'
    }

    goProductPage(category){
        cy.visit(`${this.route.baseURL}` + category)
        return this
    }*/

    get product(){
        cy.log("get product element")
        return this.getElement(this.eleYml.Product)
    }
    
    chooseProduct(productName){
        let xpathProduct = '//span[contains(text(),"' + productName +'")]'
        cy.xpath(xpathProduct).click()
        return this
    }

}