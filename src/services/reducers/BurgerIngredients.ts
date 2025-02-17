import {
  GETTING_INGREDIENTS,
  GETTING_REJECTED_INGREDIENTS,
  GETTING_REQUEST_INGREDIENTS,
} from "../constants";

import { Ingredient } from "../../utils/ingredient.type";
import { TBurgerIngredientsActions } from "../actions/BurgerIngredients";

type TBurgerIngredientsState = {
  ingredients?: Ingredient[];
  error: unknown;
};

const initialState: TBurgerIngredientsState = {
  ingredients: [],
  error: null,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
): TBurgerIngredientsState => {
  switch (action.type) {
    case GETTING_INGREDIENTS: {
      return {
        ...state,
        ingredients: action?.ingredients,
      };
    }
    case GETTING_REJECTED_INGREDIENTS: {
      return {
        ...state,
        error: action?.error,
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
