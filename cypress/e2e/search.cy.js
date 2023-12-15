/* eslint-disable no-undef */
// cypress/integration/search.spec.js
describe("Non-registered users can search through listings", () => {
  it("should perform a search and display results", () => {
    // Visit the home page
    cy.visit("https://sp2test.netlify.app/");

    // Type a search query in the search bar
    cy.get('input[type="text"]').type("test");

    // Wait for search results to load and assert the presence of results
    cy.contains("test").should("be.visible");
    cy.get("title").should("have.length.greaterThan", 0);
  });
});
