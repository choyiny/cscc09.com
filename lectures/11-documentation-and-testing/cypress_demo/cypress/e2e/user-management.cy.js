describe("user management", () => {
  const uuid = () => Cypress._.random(0, 1e6).toString();
  const username = uuid();
  const password = uuid();
  it("can handle user sign up and sign in", () => {
    cy.login(username, password);
  });

  it("can sign user out", () => {
    cy.login(username, password);
    cy.visit("/");
    cy.contains("Sign out").click();
    cy.get("#post-content").should("not.be.visible");
  });
});
