/// <reference types="Cypress" />

import HomePage from '../pages/home_page'
import ShoppingBagPage from '../pages/shopping_bag_page'
import ProductPage from '../pages/product_page'
import ProductDetailsPage from '../pages/product_details_page'

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

        cy.readFile('./src/configs/yamls/product_page.yml').then(function (yamlString){
            cy.wrap(YAML.parse(yamlString)).as('elementProductPage')
        })

        cy.readFile('./src/configs/yamls/product_details_page.yml').then(function (yamlString){
            cy.wrap(YAML.parse(yamlString)).as('elementProductDetailsPage')
        })
    })

    it('TC001 - A customer adds the products any cetegory and click "Cart" Icon', function(){
        cy.get('@elementHomePage').then(function(ele){
            const homePage = new HomePage(ele)
            homePage.chooseCategory('Blouses')
            //homePage.chooseCategory('Jewelry')
        })
        cy.get('@elementProductPage').then(function(ele){
            const productPage = new ProductPage(ele)
            productPage.chooseProduct('Mali Blouse - Rose')
            //productPage.chooseProduct('Uranus Earring - Pink/Purple')
        })
        cy.get('@elementProductDetailsPage').then(function(ele){
            const productDetailsPage = new ProductDetailsPage(ele)
            productDetailsPage.addToBag('M')
        })
        cy.get('@elementShoppingBagPage').then(function(ele){
            const shoppingBagPage = new ShoppingBagPage(ele)
            shoppingBagPage.viewMyShoppingBag()
                           .verifyShoppingBag('My Shopping Bag','Mali Blouse - Rose','M','1')
        })

    })

    it('TC002 - Customer be able to adjusts quantity of product items in Shopping Bag', function(){
            cy.get('@elementHomePage').then(function(ele){
                const homePage = new HomePage(ele)
                homePage.clickShoppingBag()
            })
            cy.get('@elementShoppingBagPage').then(function(ele){
                const shoppingBagPage = new ShoppingBagPage(ele)
                shoppingBagPage.adjustQuantityShoppingBag("3")
            })

    })

    it('TC003 - Customer be able to adjusts size of product items in Shopping Bag', function(){
        cy.get('@elementHomePage').then(function(ele){
            const homePage = new HomePage(ele)
            homePage.clickShoppingBag()
        })
        cy.get('@elementShoppingBagPage').then(function(ele){
            const shoppingBagPage = new ShoppingBagPage(ele)
            shoppingBagPage.adjustSizeShoppingBag("S")
        })

    })

    it('TC004 - Customer be able to delete of product items in Shopping Bag', function(){
        cy.get('@elementHomePage').then(function(ele){
            const homePage = new HomePage(ele)
            homePage.clickShoppingBag()
        })
        cy.get('@elementShoppingBagPage').then(function(ele){
            const shoppingBagPage = new ShoppingBagPage(ele)
            shoppingBagPage.removeProductFromCart()
        })

    })

    

})