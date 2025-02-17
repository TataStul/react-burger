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
} from "../constants";

import { Ingredient } from "../../utils/ingredient.type";
import { Order } from "../../utils/order.type";
import { TBurgerConstructorActions } from "../actions/BurgerConstructor";

type TBurgerConstructorState = {
  burgerConstructor: Ingredient[];
  amount?: number;
  error: unknown;
  loading: boolean;
  order?: Order;
  buns?: Ingredient;
  ingredient?: Ingredient;
};

export const initialStateOfBurgerConstructor: TBurgerConstructorState = {
  burgerConstructor: [],
  amount: 0,
  error: null,
  loading: false,
};

export const burgerConstructorReducer = (
  state = initialStateOfBurgerConstructor,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
  switch (action.type) {
    case ADDING_INGREDIENT: {
      return {
        ...state,
        burgerConstructor: [
          ...state.burgerConstructor,
          action.ingredient,
        ] as Ingredient[],
      };
    }
    case MOVING_INGREDIENT: {
      return {
        ...state,
        burgerConstructor: action?.burgerConstructor as Ingredient[],
      };
    }
    case REMOVING_INGREDIENT: {
      return {
        ...state,
        burgerConstructor: action?.burgerConstructor as Ingredient[],
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
        order: action?.order,
      };
    }
    case CLEARING_ORDER: {
      return {
        ...state,
        burgerConstructor: [],
        buns: undefined,
      };
    }
    case MAKING_REJECTED_ORDER: {
      return {
        ...state,
        order: undefined,
        error: action?.error,
      };
    }
    case MAKING_REQUEST_ORDER: {
      return {
        ...state,
        order: undefined,
        error: null,
      };
    }
    case ADDING_BUN: {
      return {
        ...state,
        buns: action?.bun,
      };
    }
    case RECALCULATING_AMOUNT: {
      return {
        ...state,
        amount: action?.amount,
      };
    }
    default: {
      return state;
    }
  }
};
