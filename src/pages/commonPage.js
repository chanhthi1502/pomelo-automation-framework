/// <reference types="Cypress"/>


class CommonPage {

    constructor(eleYml){
        this.eleYml = eleYml
    }

   getElement(locator, timeout=30000){
       if(locator.startsWith("/")|| locator.startsWith("(")){
           return cy.xpath(locator,{timeout : timeout})
       }else{
           return cy.get(locator,{timeout : timeout})
       }
   }
}

export default CommonPage