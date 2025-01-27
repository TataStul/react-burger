import {
  GETTING_INGREDIENTS,
  GETTING_REJECTED_INGREDIENTS,
  GETTING_REQUEST_INGREDIENTS,
} from "../actions/BurgerIngredients";

import { ActionType } from "../../utils/action.type";

const initialState = {
  ingredients: [],
  error: null,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GETTING_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.payload.data,
      };
    }
    case GETTING_REJECTED_INGREDIENTS: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case GETTING_REQUEST_INGREDIENTS: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};
