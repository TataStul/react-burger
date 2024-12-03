import { getData } from "../../utils/api/data.service";

type ActionType = {
  type: string;
  payload?: any;
};

export const GETTING_INGREDIENTS = "GETTING_INGREDIENTS";
export const GETTING_REQUEST_INGREDIENTS = "GETTING_REQUEST_INGREDIENTS";
export const GETTING_REJECTED_INGREDIENTS = "GETTING_REJECTED_INGREDIENTS";

export const fetchIngredientsThunk =
  () => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: GETTING_REQUEST_INGREDIENTS });

    try {
      const data = await getData();
      dispatch({
        type: GETTING_INGREDIENTS,
        payload: data,
      });
    } catch (e) {
      dispatch({ type: GETTING_REJECTED_INGREDIENTS, payload: e });
    }
  };

//для быстрой вставки
// import {
//   GETTING_INGREDIENTS,
//   GETTING_REQUEST_INGREDIENTS,
//   GETTING_REJECTED_INGREDIENTS,
//   fetchIngredientsThunk
// } from "../../services/actions/BurgerIngredients";
