/// <reference types="Cypress" />

import HomePage from '../pages/home_page'
import ShoppingBagPage from '../pages/shopping_bag_page'

YAML = require('yamljs')

describe('Shopping Bag test suite', function(){

    beforeEach(function () {
        const envVariables = Cypress.env()
        cy.login(envVariables.email,envVariables.password)
        cy.readFile('./src/configs/yamls/home_page.yml').then(function (yamlString){
            cy.wrap(YAML.parse(yamlString)).as('elementHomePage')
        })

        cy.readFile('./src/configs/yamls/shopping_bag_page.yml').then(function (yamlString){
            cy.wrap(YAML.parse(yamlString)).as('elementShoppingBagPage')
        })
    })

    it('TC002 - Customer be able to adjusts quantity of product items in Shopping Bag', function(){
            cy.get('@elementHomePage').then(function(ele){
                const homePage = new HomePage(ele)
                homePage.clickShoppingBag()
            })
            cy.get('@elementShoppingBagPage').then(function(ele){
                const shoppingBagPage = new ShoppingBagPage(ele)
                shoppingBagPage.verifyShoppingBag("My Shopping Bag")
                               .adjustQuantityShoppingBag("3")
            })

    })

    it('TC003 - Customer be able to adjusts size of product items in Shopping Bag', function(){
        cy.get('@elementHomePage').then(function(ele){
            const homePage = new HomePage(ele)
            homePage.clickShoppingBag()
        })
        cy.get('@elementShoppingBagPage').then(function(ele){
            const shoppingBagPage = new ShoppingBagPage(ele)
            shoppingBagPage.verifyShoppingBag("My Shopping Bag")
                           .adjustSizeShoppingBag("S")
        })

    })

    

})