import {
  ADDING_INGREDIENT,
  MOVING_INGREDIENT,
  REMOVING_INGREDIENT,
  GETTING_BURGER_CONSTRUCTOR,
  MAKING_ORDER,
  CLEARING_ORDER,
  MAKING_REJECTED_ORDER,
  MAKING_REQUEST_ORDER,
  ADDING_BUN,
  RECALCULATING_AMOUNT,
} from "../actions/BurgerConstructor";

type ActionType = {
  type: string;
  payload?: any;
};

const initialState = {
  burgerConstructor: [],
  amount: 0,
  order: {},
  buns: {},
  ingredient: {},
  error: null,
};

export const burgerConstructorReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADDING_INGREDIENT: {
      return {
        ...state,
        burgerConstructor: [...state.burgerConstructor, action.payload],
      };
    }
    case MOVING_INGREDIENT: {
      return {
        ...state,
        burgerConstructor: action.payload,
      };
    }
    case REMOVING_INGREDIENT: {
      return {
        ...state,
        burgerConstructor: action.payload,
      };
    }
    case GETTING_BURGER_CONSTRUCTOR: {
      return {
        ...state,
        burgerConstructor: [...state.burgerConstructor],
      };
    }
    case MAKING_ORDER: {
      return {
        ...state,
        order: action.payload,
      };
    }
    case CLEARING_ORDER: {
      return {
        ...state,
        burgerConstructor: [],
        buns: null,
      };
    }
    case MAKING_REJECTED_ORDER: {
      return {
        ...state,
        order: [],
        error: action.payload,
      };
    }
    case MAKING_REQUEST_ORDER: {
      return {
        ...state,
        order: [],
        error: null,
      };
    }
    case ADDING_BUN: {
      return {
        ...state,
        buns: action.payload,
      };
    }
    case RECALCULATING_AMOUNT: {
      return {
        ...state,
        amount: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
