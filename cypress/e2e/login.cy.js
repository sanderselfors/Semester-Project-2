/* eslint-disable no-undef */
// cypress/integration/login.spec.js
describe("Login User Journey", () => {
  beforeEach(() => {
    // Visit the home page to access the login button
    cy.visit("https://sp2test.netlify.app/");

    // Click the login button to navigate to the login page
    cy.contains("Log In").click();
  });

  it("should log in successfully with valid credentials", () => {
    cy.get('input[name="email"]').type("testbruker2@stud.noroff.no");
    cy.get('input[name="password"]').type("testbruker2");
    cy.get('button[type="submit"]').click();

    // Wait for the login to complete and assert successful login
    cy.url().should("include", "/");
    cy.contains("Login successful.").should("be.visible");
  });

  it("should show an error message with invalid credentials", () => {
    cy.get('input[name="email"]').type("invalid_email@example.com");
    cy.get('input[name="password"]').type("invalid_password");
    cy.get('button[type="submit"]').click();

    // Wait for the error message to appear and assert it
    cy.contains("Invalid credentials").should("be.visible");
  });
});
