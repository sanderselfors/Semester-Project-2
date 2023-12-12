/* eslint-disable no-undef */
// cypress/integration/bid.spec.js
describe("Registered users can add a bid to another user’s listing", () => {
  it("should successfully place a bid on a listing", () => {
    // Assuming you have a registered user with valid credentials
    const email = "testbruker2@stud.noroff.no";
    const password = "testbruker2";

    // Visit the home page
    cy.visit("https://sp2test.netlify.app/");

    // Click on the "Log In" button in the navigation
    cy.contains("Log In").click();

    // Log in with user credentials
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Wait for the login to complete
    cy.contains("Login successful.").should("be.visible");

    // Navigate to the details page of a listing (you may need to adjust the URL)
    // Here, we are clicking on the first listing in the grid
    cy.get(".grid.grid-cols-1 a").first().click();

    // Type the bid amount in the input field
    const bidAmount = 50;
    cy.get('input[type="number"]').type(bidAmount);

    // Submit the bid form
    cy.get('button[type="submit"]').click();

    // Wait for the bid to be placed and assert success message
    cy.contains("Bid placed successfully!").should("be.visible");
  });
});
