import { GETTING_INGREDIENT_DETAILS } from "../constants";
import { Ingredient } from "../../utils/ingredient.type";

export interface IGettingIngredientDetails {
  readonly type: typeof GETTING_INGREDIENT_DETAILS;
  ingredient: Ingredient;
}

export type TIngredientDetailsActions = IGettingIngredientDetails;

export const getIngredientDetails = (
  ingredient: Ingredient
): IGettingIngredientDetails => ({
  type: GETTING_INGREDIENT_DETAILS,
  ingredient,
});
