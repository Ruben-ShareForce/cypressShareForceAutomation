describe("ShareForce Login", () => {
    it("logs onto the ShareForce Demo app", () => {
        cy.visit("/");
        cy.wait(500);

        cy.url().should('include', '/login');
    })
})