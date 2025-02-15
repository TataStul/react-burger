import { GETTING_INGREDIENT_DETAILS } from "../actions/IngredientDetails";

import { ActionType } from "../../utils/action.type";

const initialState = {
  ingredient: {},
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GETTING_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
