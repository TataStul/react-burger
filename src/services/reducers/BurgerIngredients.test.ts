import {
  burgerIngredientsReducer,
  initialStateOfBurgerIngredients,
} from "./BurgerIngredients";

import {
  getErrorOfIngredients,
  getIngredients,
  makeRequestOfIngredients,
  TBurgerIngredientsActions,
} from "../actions/BurgerIngredients";

import { v4 } from "uuid";
import { Ingredient } from "../../utils/ingredient.type";

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

describe("reducer: BurgerIngredients", () => {
  it("should return the initial state", () => {
    expect(
      burgerIngredientsReducer(
        initialStateOfBurgerIngredients,
        {} as TBurgerIngredientsActions
      )
    ).toEqual(initialStateOfBurgerIngredients);
  });
  it("should get ingredients", () => {
    expect(
      burgerIngredientsReducer(
        initialStateOfBurgerIngredients,
        getIngredients([testIngredient])
      )
    ).toEqual({
      ...initialStateOfBurgerIngredients,
      ingredients: [testIngredient],
    });
  });
  it("should catch ingredients error", () => {
    expect(
      burgerIngredientsReducer(
        initialStateOfBurgerIngredients,
        getErrorOfIngredients({ error: "ooops" })
      )
    ).toEqual({
      ...initialStateOfBurgerIngredients,
      error: {
        error: "ooops",
      },
    });
  });
  it("should request ingredients", () => {
    expect(
      burgerIngredientsReducer(
        initialStateOfBurgerIngredients,
        makeRequestOfIngredients()
      )
    ).toEqual({
      ...initialStateOfBurgerIngredients,
    });
  });
});
