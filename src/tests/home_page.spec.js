/// <reference types="Cypress" />

import HomePage from '../pages/home_page'

YAML = require('yamljs')

describe('Home Page test suite', function(){

    beforeEach(function () {
        cy.readFile('./src/configs/yamls/home_page.yml').then(function (yamlString){
            cy.wrap(YAML.parse(yamlString)).as('elementHomePage')
        })
    })

    it('TC001 - Checking Shopping Page when user does not logged in', function(){
            cy.get('@elementHomePage').then(function(ele){
                const homePage = new HomePage(ele)

                homePage.go()
                        .clickShoppingBag()
                        .verifyShoppingBag("My Shopping Bag")
            })
    })

})