import { GETTING_INGREDIENT_DETAILS } from "../constants";

import { ActionType } from "../../utils/action.type";
import { Ingredient } from "../../utils/ingredient.type";

type TIngredientDetailsState = {
  ingredient?: Ingredient;
};

const initialState: TIngredientDetailsState = {
  ingredient: undefined,
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: ActionType
): TIngredientDetailsState => {
  switch (action.type) {
    case GETTING_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: action?.ingredient,
      };
    }
    default: {
      return state;
    }
  }
};
