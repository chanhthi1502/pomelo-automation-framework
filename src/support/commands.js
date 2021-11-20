// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login',(email,password) => {
    cy.visit('https://www.pomelofashion.com/th/en')
    cy.xpath('//span[contains(text(),"Login")]').click()
    cy.xpath('//input[@name="email"]').type(email)
    cy.xpath('//input[@name="password"]').type(password)
    cy.xpath('//button[contains(@data-cy,"auth__login__email__button")]').click()
    cy.wait(3000)
    return this
})
