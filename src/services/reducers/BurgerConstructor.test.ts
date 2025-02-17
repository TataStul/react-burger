import {
  burgerConstructorReducer,
  initialStateOfBurgerConstructor,
} from "./BurgerConstructor";

import {
  TBurgerConstructorActions,
  addBun,
  addIngredient,
  clearOrderAction,
  getError,
  getOfBurgerConstructorAction,
  getOrder,
  makeRequest,
  moveIngredientAction,
  recalculateAmountAction,
  removeIngredientAction,
} from "../actions/BurgerConstructor";

import { v4 } from "uuid";
import { Ingredient } from "../../utils/ingredient.type";
import { Order } from "../../utils/order.type";

const _id = v4();

const testIngredient: Ingredient = {
  _id,
  name: "string;",
  type: "string;",
  proteins: 100,
  fat: 100,
  carbohydrates: 100,
  calories: 100,
  price: 1000,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  __v: 0,
};
const testOrder: Order = { name: "name", order: { number: 1 }, success: true };

describe("reducer: BurgerConstructor", () => {
  it("should return the initial state", () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        {} as TBurgerConstructorActions
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
    });
  });

  it("should get BurgerConstructor", () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        getOfBurgerConstructorAction()
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
    });
  });

  it("should add bun to BurgerConstructor", () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        addBun(testIngredient)
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      buns: testIngredient,
    });
  });

  it("should add ingredient", () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        addIngredient(testIngredient)
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      burgerConstructor: [
        ...initialStateOfBurgerConstructor.burgerConstructor,
        testIngredient,
      ],
    });
  });

  it("should remove Ingredient", () => {
    expect(
      burgerConstructorReducer(
        {
          ...initialStateOfBurgerConstructor,
          burgerConstructor: [testIngredient, { ...testIngredient, _id: v4() }],
        },
        removeIngredientAction([testIngredient])
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      burgerConstructor: [testIngredient],
    });
  });

  it("should recalculate amount", () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        recalculateAmountAction(12)
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      amount: 12,
    });
  });

  it("should move Ingredient", () => {
    const newBurgerConstructor: Ingredient[] = [
      testIngredient,
      { ...testIngredient, _id: v4() },
      { ...testIngredient, _id: v4() },
    ];
    const dragIndex = 2;
    const hoverIndex = 0;

    const dragItem = newBurgerConstructor[dragIndex];
    const updatedIngredients = [...newBurgerConstructor];
    updatedIngredients.splice(dragIndex, 1);
    updatedIngredients.splice(hoverIndex, 0, dragItem);
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        moveIngredientAction(updatedIngredients)
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      burgerConstructor: updatedIngredients,
    });
  });

  it("should make Order", () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        getOrder(testOrder)
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      order: testOrder,
    });
  });

  it("should clear Order", () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        clearOrderAction()
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      burgerConstructor: [],
      buns: undefined,
    });
  });

  it("should catch order error", () => {
    expect(
      burgerConstructorReducer(
        initialStateOfBurgerConstructor,
        getError({ error: "ooops" })
      )
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      error: {
        error: "ooops",
      },
    });
  });

  it("should make order request", () => {
    expect(
      burgerConstructorReducer(initialStateOfBurgerConstructor, makeRequest())
    ).toEqual({
      ...initialStateOfBurgerConstructor,
      loading: false,
    });
  });
});
