/// <reference types="cypress" />

describe("Burger Constructor functions properly", () => {
  beforeEach(function () {
    cy.viewport(1440, 900);
    cy.visit("/");
    cy.get('[id="dragstart"]').first().as("dragstartDiv");
    cy.get("p.text.text_type_main-medium").as("productCompositionBlock");
    cy.get("button").contains("Оформить заказ").as("confirmButton");
    cy.get("p.text.text_type_main-default.text_color_inactive")
      .contains(
        "Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа"
      )
      .as("dropWindow");
    cy.get("p.text.text_type_main-large").as("title");
  });

  it("starting state of the page", () => {
    cy.get("@title").should("have.text", "Соберите бургер");
    cy.get("@confirmButton").should("be.disabled");
  });

  it("should drag-and-drop Bun into Cart, then navigate to login after Confirm order is pressed", () => {
    const dataTransfer = new DataTransfer();
    if (
      cy.get("@productCompositionBlock").first().should("have.text", "Булки")
    ) {
      cy.get("@dragstartDiv").trigger("dragstart", { dataTransfer });
      cy.get("@dropWindow").trigger("drop", { dataTransfer });
      cy.get("@confirmButton").click();
    }
  });

  it("should display modal with bun details", () => {
    if (
      cy.get("@productCompositionBlock").first().should("have.text", "Булки")
    ) {
      cy.get("@dragstartDiv").click();
    }
  });

  it("should login process work and order modal be shown", () => {
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: {
        success: true,
        accessToken: "fake-token",
        refreshToken: "fake-refresh-token",
      },
    }).as("loginRequest");

    cy.visit("/login");
    cy.get("input.text.input__textfield.text_type_main-default").as(
      "inputField"
    );
    cy.get("@inputField").first().type("t.stulkova@yandex.ru");
    cy.get("@inputField").last().type("12345678");
    cy.get("button").click();

    const dataTransfer = new DataTransfer();

    if (
      cy.get("@productCompositionBlock").last().should("have.text", "Начинки")
    ) {
      cy.get("@dragstartDiv").trigger("dragstart", { dataTransfer });
      cy.get("@dropWindow").trigger("drop", { dataTransfer });
      cy.get("@confirmButton").click();

      cy.get('[id="modal-overlay"]');
      cy.get('[class*="closeButton"]').click();
      cy.get("@dropWindow");
    }
  });
});
