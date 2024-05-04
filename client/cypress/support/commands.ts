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
/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.findByRole("link", { name: "Login" }).click();
  cy.origin(Cypress.env("auth_domain"), () => {
    cy.get('input[name="username"]').type(Cypress.env("auth_username"));
    cy.get('input[name="password"]').type(Cypress.env("auth_password"));
    cy.get('button[name="action"]').click();
  });
  cy.findByRole("link", { name: "Logout" });
  cy.findByText(Cypress.env("auth_username"));
});
