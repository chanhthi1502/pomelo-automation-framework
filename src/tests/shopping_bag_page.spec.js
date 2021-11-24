/// <reference types="Cypress" />

import HomePage from '../pages/home_page'
import ShoppingBagPage from '../pages/shopping_bag_page'
import ProductCategoryPage from '../pages/product_category_page'
import ProductSinglePage from '../pages/product_single_page'

YAML = require('yamljs')

const dataTest = require ('../dataSource/pomelo_data_test')
const using = require('jasmine-data-provider')

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

        cy.readFile('./src/configs/yamls/product_category_page.yml').then(function (yamlString){
            cy.wrap(YAML.parse(yamlString)).as('elementProductCategoryPage')
        })

        cy.readFile('./src/configs/yamls/product_single_page.yml').then(function (yamlString){
            cy.wrap(YAML.parse(yamlString)).as('elementProductSinglePage')
        })
    })

    using(dataTest['test'].data, (data,description) => {
        it(`Test Case - A customer adds the ${description} and click "Cart" Icon`, function(){
            cy.get('@elementHomePage').then(function(ele){
                const homePage = new HomePage(ele)
                homePage.chooseCategory(data.category)
            })
            cy.get('@elementProductCategoryPage').then(function(ele){
                const productCategoryPage = new ProductCategoryPage(ele)
                productCategoryPage.chooseProduct(data.product)
                //productPage.chooseProduct('Uranus Earring - Pink/Purple')
            })
            cy.get('@elementProductSinglePage').then(function(ele){
                const productSinglePage = new ProductSinglePage(ele)
                productSinglePage.addToBag(data.size)
            })
            cy.get('@elementShoppingBagPage').then(function(ele){
                const shoppingBagPage = new ShoppingBagPage(ele)
                shoppingBagPage.viewMyShoppingBag()
                               .verifyShoppingBag('My Shopping Bag','Mali Blouse - Rose','M','1')
            })
    
        })

        it('Test Case - Customer be able to adjusts quantity of product items in Shopping Bag', function(){
            cy.get('@elementHomePage').then(function(ele){
                const homePage = new HomePage(ele)
                homePage.clickShoppingBag()
            })
            cy.get('@elementShoppingBagPage').then(function(ele){
                const shoppingBagPage = new ShoppingBagPage(ele)
                shoppingBagPage.adjustQuantityShoppingBag(data.quantity)
            })

        })

        it('Test Case - Customer be able to adjusts size of product items in Shopping Bag', function(){
            cy.get('@elementHomePage').then(function(ele){
                const homePage = new HomePage(ele)
                homePage.clickShoppingBag()
            })
            cy.get('@elementShoppingBagPage').then(function(ele){
                const shoppingBagPage = new ShoppingBagPage(ele)
                shoppingBagPage.adjustSizeShoppingBag(data.newSize)
            })
    
        })

        it('Test Case - Customer be able to delete of product items in Shopping Bag', function(){
            cy.get('@elementHomePage').then(function(ele){
                const homePage = new HomePage(ele)
                homePage.clickShoppingBag()
            })
            cy.get('@elementShoppingBagPage').then(function(ele){
                const shoppingBagPage = new ShoppingBagPage(ele)
                shoppingBagPage.removeProductFromCart()
                               .verifyEmptyShoppingBag()
            })
    
        })

        it('Test Case - Customer be able to fill-in and click apply promo code - verify Invalid Promo code', function(){
            cy.get('@elementHomePage').then(function(ele){
                const homePage = new HomePage(ele)
                homePage.chooseCategory(data.category)
            })
            cy.get('@elementProductCategoryPage').then(function(ele){
                const productCategoryPage = new ProductCategoryPage(ele)
                productCategoryPage.chooseProduct(data.product)
            })
            cy.get('@elementProductSinglePage').then(function(ele){
                const productSinglePage = new ProductSinglePage(ele)
                productSinglePage.addToBag(data.size)
            })
            cy.get('@elementShoppingBagPage').then(function(ele){
                const shoppingBagPage = new ShoppingBagPage(ele)
                shoppingBagPage.viewMyShoppingBag()
                               .applyPromoCode(data.promoCode)
                               .verifyInvalidPromoCode()
                               .removeProductFromCart()
                               .verifyEmptyShoppingBag()
            })
    
        })

        it('Test Case - Customer be able to validate proceed to checkout button', function(){
            cy.get('@elementHomePage').then(function(ele){
                const homePage = new HomePage(ele)
                homePage.chooseCategory(data.category)
            })
            cy.get('@elementProductCategoryPage').then(function(ele){
                const productCategoryPage = new ProductCategoryPage(ele)
                productCategoryPage.chooseProduct(data.product)
            })
            cy.get('@elementProductSinglePage').then(function(ele){
                const productSinglePage = new ProductSinglePage(ele)
                productSinglePage.addToBag(data.size)
            })
            cy.get('@elementShoppingBagPage').then(function(ele){
                const shoppingBagPage = new ShoppingBagPage(ele)
                shoppingBagPage.viewMyShoppingBag()
                               .verifyProceedToCheckOutButton()
                               .checkOut()
                cy.go('back')
                                    
            }) 
            cy.get('@elementShoppingBagPage').then(function(ele){
                const shoppingBagPage = new ShoppingBagPage(ele)
                shoppingBagPage.removeProductFromCart()
                               .verifyEmptyShoppingBag()
            })
    
        })
    })
})