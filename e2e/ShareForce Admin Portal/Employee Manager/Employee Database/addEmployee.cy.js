describe("Add Employee Flow" , () => {
    beforeEach(() => {
        cy.loginRoot();
        cy.wait(1000);
    });
    
    it("can verify all validations for adding a new employee", () => {
        cy.visit("/");
        cy.wait(500);
    });

});