import { makeOrder } from "../../utils/api/data.service";

type ActionType = {
  type: string;
  payload?: any;
};

export const ADDING_INGREDIENT = "ADDING_INGREDIENT";
export const MOVING_INGREDIENT = "MOVING_INGREDIENT";
export const REMOVING_INGREDIENT = "REMOVING_INGREDIENT";
export const GETTING_BURGER_CONSTRUCTOR = "GETTING_BURGER_CONSTRUCTOR";
export const MAKING_ORDER = "MAKING_ORDER";
export const CLEARING_ORDER = "CLEARING_ORDER";
export const MAKING_REJECTED_ORDER = "MAKING_REJECTED_ORDER";
export const MAKING_REQUEST_ORDER = "MAKING_REQUEST_ORDER";
export const ADDING_BUN = "ADDING_BUN";
export const RECALCULATING_AMOUNT = "RECALCULATING_AMOUNT";

export const fetchMakingOrderThunk =
  (order: string[]) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: MAKING_REQUEST_ORDER });

    try {
      const data = await makeOrder(order);
      dispatch({
        type: MAKING_ORDER,
        payload: data,
      });
    } catch (e) {
      dispatch({ type: MAKING_REJECTED_ORDER, payload: e });
    }
  };

//для быстрой вставки
// import {
//   ADDING_INGREDIENT,
//   MOVING_INGREDIENT,
//   REMOVING_INGREDIENT,
//   GETTING_BURGER_CONSTRUCTOR,
//   MAKING_ORDER,
//   CLEARING_ORDER,
//   MAKING_REJECTED_ORDER,
//   MAKING_REQUEST_ORDER,
//   ADDING_BUN,
//   RECALCULATING_AMOUNT,
//   fetchMakingOrderThunk
// } from "../../services/actions/BurgerConstructor";
