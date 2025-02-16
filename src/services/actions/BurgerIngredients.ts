import {
  GETTING_INGREDIENTS,
  GETTING_REJECTED_INGREDIENTS,
  GETTING_REQUEST_INGREDIENTS,
} from "../constants";

import { Ingredient } from "../../utils/ingredient.type";
import { getData } from "../../utils/api/data.service";
import { AppDispatch, AppThunkAction } from "../types";

// interfaces
export interface IGetIngredients {
  readonly type: typeof GETTING_INGREDIENTS;
  ingredients: Ingredient[];
}
export interface IRejectedOfIngredientGetting {
  readonly type: typeof GETTING_REJECTED_INGREDIENTS;
  error: unknown;
}
export interface IRequestOfIngredientGetting {
  readonly type: typeof GETTING_REQUEST_INGREDIENTS;
}
export type TBurgerIngredientsActions =
  | IGetIngredients
  | IRejectedOfIngredientGetting
  | IRequestOfIngredientGetting;

export const fetchIngredientsThunk: AppThunkAction =
  () => async (dispatch: AppDispatch) => {
    dispatch(makeRequestOfIngredients());

    try {
      await getData().then((ingredients) =>
        dispatch(getIngredients(ingredients.data))
      );
    } catch (e) {
      dispatch(getErrorOfIngredients(e));
    }
  };

// consts
export const getIngredients = (ingredients: Ingredient[]): IGetIngredients => ({
  type: GETTING_INGREDIENTS,
  ingredients,
});
export const getErrorOfIngredients = (
  error: unknown
): IRejectedOfIngredientGetting => ({
  type: GETTING_REJECTED_INGREDIENTS,
  error,
});
export const makeRequestOfIngredients = (): IRequestOfIngredientGetting => ({
  type: GETTING_REQUEST_INGREDIENTS,
});
