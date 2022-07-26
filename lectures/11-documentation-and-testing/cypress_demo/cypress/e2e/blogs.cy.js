describe("microblog", () => {
  // signing in a user
  const random = () => Cypress._.random(0, 1e6).toString();
  const username = random();
  const password = random();

  // some content
  const content = random();

  it("can post a message after logging in", () => {
    cy.login(username, password);
    cy.visit("/");

    // create a post
    cy.get("#post-content").type(content);
    cy.get("form#create-message-form").submit();
    // check that it is in view
    cy.get(".message-content").contains(content);
  });
});
