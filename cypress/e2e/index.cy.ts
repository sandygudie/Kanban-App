describe("page load", () => {
  it("displays board", () => {
    cy.visit("/");
    cy.contains("p", "Effortlessly Manage").should("be.visible");
  });
});
