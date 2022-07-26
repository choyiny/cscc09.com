Cypress.Commands.add("login", (username, password) => {
  cy.session([username, password], () => {
    // sign up
    cy.visit("/");
    cy.contains("Sign in or Sign up").click();
    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);
    cy.get("#signup").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/");
    // sign in
    cy.contains("Sign in or Sign up").click();
    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);
    cy.get("#signin").click();
    cy.get("#signout-button").contains("Sign out");
  });
});
