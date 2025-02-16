import store from "../store";

import { Action, ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { TBurgerIngredientsActions } from "../actions/BurgerIngredients";
import { TBurgerConstructorActions } from "../actions/BurgerConstructor";
import { TIngredientDetailsActions } from "../actions/IngredientDetails";
import { TFeedActions } from "../actions/Feeds";
import { TForgotPasswordActions } from "../actions/ForgotPassword";
import { TLoginActions } from "../actions/Login";
import { TRegistrationActions } from "../actions/Registration";
import { TResetPasswordAction } from "../actions/ResetPassword";
import { TUserActions } from "../actions/User";
import { TWsActions } from "../actions/WS";

export type AppActions =
  | TBurgerIngredientsActions
  | TBurgerConstructorActions
  | TIngredientDetailsActions
  | TForgotPasswordActions
  | TFeedActions
  | TLoginActions
  | TRegistrationActions
  | TResetPasswordAction
  | TUserActions
  | TWsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, AppActions>
>;
