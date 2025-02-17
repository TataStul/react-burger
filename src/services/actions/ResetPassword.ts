import {
  RESET_PASSWORD_REJECTED,
  RESET_PASSWORD_REQUEST,
  RESETTING_PASSWORD,
} from "../constants";

import { UserResetPassword } from "../../utils/user-reset-password.type";
import { resetPassword } from "../../utils/api/data.service";
import { UserResponse } from "../../utils/user-response.type";
import { AppDispatch, AppThunkAction } from "../types";

// interfaces
export interface IResetPasswordRejected {
  readonly type: typeof RESET_PASSWORD_REJECTED;
  error: unknown;
}
export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResettingPassword {
  readonly type: typeof RESETTING_PASSWORD;
  response: UserResponse;
}

export type TResetPasswordAction =
  | IResetPasswordRejected
  | IResetPasswordRequest
  | IResettingPassword;

export const fetchResetPasswordThunk: AppThunkAction =
  (credits: UserResetPassword) => async (dispatch: AppDispatch) => {
    dispatch(makeResetPasswordRequest());
    try {
      const response = await resetPassword(credits);
      dispatch(makeResetPassword(response));
    } catch (e) {
      dispatch(catchResetPasswordThunk(e));
    }
  };

// consts
export const catchResetPasswordThunk = (
  error: unknown
): IResetPasswordRejected => ({
  type: RESET_PASSWORD_REJECTED,
  error,
});
export const makeResetPasswordRequest = (): IResetPasswordRequest => ({
  type: RESET_PASSWORD_REQUEST,
});
export const makeResetPassword = (
  response: UserResponse
): IResettingPassword => ({
  type: RESETTING_PASSWORD,
  response,
});
