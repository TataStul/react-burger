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

import { makeOrder } from "../../utils/api/data.service";
import { Order } from "../../utils/order.type";
import { Ingredient } from "../../utils/ingredient.type";
import { AppDispatch, AppThunkAction } from "../types";

// interfaces
export interface IIngredientAdding {
  readonly type: typeof ADDING_INGREDIENT;
  ingredient: Ingredient;
}
export interface IIngredientMoving {
  readonly type: typeof MOVING_INGREDIENT;
  burgerConstructor: Ingredient[];
}
export interface IIngredientRemoving {
  readonly type: typeof REMOVING_INGREDIENT;
  burgerConstructor: Ingredient[];
}
export interface IBurgerConstructorGetting {
  readonly type: typeof GETTING_BURGER_CONSTRUCTOR;
}
export interface IMakingOrder {
  readonly type: typeof MAKING_ORDER;
  order: Order;
}
export interface IClearOrder {
  readonly type: typeof CLEARING_ORDER;
}
export interface IRejectMakingOrder {
  readonly type: typeof MAKING_REJECTED_ORDER;
  error: unknown;
}
export interface IRequestMakingOrder {
  readonly type: typeof MAKING_REQUEST_ORDER;
}
export interface IBunAdding {
  readonly type: typeof ADDING_BUN;
  bun: Ingredient;
}
export interface IAmountRecalculation {
  readonly type: typeof RECALCULATING_AMOUNT;
  amount?: number;
}

export type TBurgerConstructorActions =
  | IIngredientAdding
  | IIngredientMoving
  | IIngredientRemoving
  | IBurgerConstructorGetting
  | IMakingOrder
  | IClearOrder
  | IRejectMakingOrder
  | IRequestMakingOrder
  | IBunAdding
  | IAmountRecalculation;

export const fetchMakingOrderThunk: AppThunkAction =
  (order: string[]) => async (dispatch: AppDispatch) => {
    dispatch(makeRequest());

    try {
      await makeOrder(order).then((data) => dispatch(getOrder(data)));
    } catch (e) {
      dispatch(getError(e));
    }
  };

// consts
export const addIngredient = (ingredient: Ingredient): IIngredientAdding => ({
  type: ADDING_INGREDIENT,
  ingredient,
});
export const moveIngredientAction = (
  burgerConstructor: Ingredient[]
): IIngredientMoving => ({
  type: MOVING_INGREDIENT,
  burgerConstructor,
});
export const removeIngredientAction = (
  burgerConstructor: Ingredient[]
): IIngredientRemoving => ({
  type: REMOVING_INGREDIENT,
  burgerConstructor,
});
export const getOfBurgerConstructorAction = (): IBurgerConstructorGetting => ({
  type: GETTING_BURGER_CONSTRUCTOR,
});
export const getOrder = (order: Order): IMakingOrder => ({
  type: MAKING_ORDER,
  order,
});
export const clearOrderAction = (): IClearOrder => ({
  type: CLEARING_ORDER,
});
export const getError = (error: unknown): IRejectMakingOrder => ({
  type: MAKING_REJECTED_ORDER,
  error,
});
export const makeRequest = (): IRequestMakingOrder => ({
  type: MAKING_REQUEST_ORDER,
});
export const addBun = (bun: Ingredient): IBunAdding => ({
  type: ADDING_BUN,
  bun,
});
export const recalculateAmountAction = (
  amount?: number
): IAmountRecalculation => ({
  type: RECALCULATING_AMOUNT,
  amount,
});
