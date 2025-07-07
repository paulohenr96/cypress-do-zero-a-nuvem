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


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', formulario=>{
    cy.get('input[name="firstName"]').type(formulario.firstName)
    cy.get('input[name="lastName"]').type(formulario.lastName)
    cy.get('input[name="email"]').first().type(formulario.email)
    cy.get('input[name="phone"]').first().type(formulario.phone)
    cy.get('textarea').type(formulario.textarea)
 
    cy.contains('Enviar').click()

})
