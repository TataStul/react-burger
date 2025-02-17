import {
  ingredientDetailsReducer,
  initialStateOfIngredientDetails,
} from "./IngredientDetails";

import {
  getIngredientDetails,
  TIngredientDetailsActions,
} from "../actions/IngredientDetails";

import { Ingredient } from "../../utils/ingredient.type";
import { v4 } from "uuid";

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

describe("reducer: IngredientDetails", () => {
  it("should get ingredient details", () => {
    expect(
      ingredientDetailsReducer(
        initialStateOfIngredientDetails,
        getIngredientDetails(testIngredient)
      )
    ).toEqual({
      ...initialStateOfIngredientDetails,
      ingredient: testIngredient,
    });
  });
  it("should return initial state", () => {
    expect(
      ingredientDetailsReducer(
        initialStateOfIngredientDetails,
        {} as TIngredientDetailsActions
      )
    ).toEqual(initialStateOfIngredientDetails);
  });
});
