import {
  FORGOT_PASSWORD_REJECTED,
  FORGOT_PASSWORD_REQUEST,
  SENDING_EMAIL,
} from "../constants";

import { UserResponse } from "../../utils/user-response.type";
import { rememberPassword } from "../../utils/api/data.service";
import { AppDispatch, AppThunkAction } from "../types";

// interfaces
export interface IForgotPasswordRejected {
  readonly type: typeof FORGOT_PASSWORD_REJECTED;
  error: unknown;
}
export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
  email: string;
}
export interface ISendingEmail {
  readonly type: typeof SENDING_EMAIL;
  response: UserResponse;
}
export type TForgotPasswordActions =
  | IForgotPasswordRejected
  | IForgotPasswordRequest
  | ISendingEmail;

export const fetchForgotPasswordThunk: AppThunkAction =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch(makeRequestOfForgotPassword(email));

    try {
      await rememberPassword(email).then((response) =>
        dispatch(sendEmail(response))
      );
    } catch (e) {
      dispatch(catchErrorOfForgotPassword(e));
    }
  };

// consts
export const catchErrorOfForgotPassword = (
  error: unknown
): IForgotPasswordRejected => ({
  type: FORGOT_PASSWORD_REJECTED,
  error,
});
export const makeRequestOfForgotPassword = (
  email: string
): IForgotPasswordRequest => ({
  type: FORGOT_PASSWORD_REQUEST,
  email,
});
export const sendEmail = (response: UserResponse): ISendingEmail => ({
  type: SENDING_EMAIL,
  response,
});
