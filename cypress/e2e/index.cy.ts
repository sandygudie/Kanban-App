describe("page load", () => {
  it("displays board", () => {
    cy.visit("/");
    cy.contains("h1", "Effortlessly Manage your Projects.").should("be.visible");
  });
});
