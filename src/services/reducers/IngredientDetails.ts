import { GETTING_INGREDIENT_DETAILS } from "../actions/IngredientDetails";

type ActionType = {
  type: string;
  payload?: any;
};

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
