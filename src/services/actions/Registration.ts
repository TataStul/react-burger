import {
  REGISTRATION,
  REGISTRATION_REJECTED,
  REGISTRATION_REQUEST,
} from "../constants";

import { registerUser } from "../../utils/api/auth.service";
import { setCookie } from "../../utils/cookie-set";
import { UserRegister } from "../../utils/user-register.type";
import { UserResponse } from "../../utils/user-response.type";
import { AppDispatch, AppThunkAction } from "../types";

// interfaces
export interface IGetRegistration {
  readonly type: typeof REGISTRATION;
  response: UserResponse;
}
export interface IRegistrationRejected {
  readonly type: typeof REGISTRATION_REJECTED;
  error: unknown;
}
export interface IRegistrationRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}

export type TRegistrationActions =
  | IGetRegistration
  | IRegistrationRejected
  | IRegistrationRequest;

export const fetchRegisterThunk: AppThunkAction =
  (credits: UserRegister) => async (dispatch: AppDispatch) => {
    dispatch(makeRegistrationRequest());

    try {
      await registerUser(credits).then((response) => {
        setCookie("accessToken", response.accessToken!);
        localStorage.setItem("refreshToken", response.refreshToken);
        dispatch(makeRegistration(response));
      });
    } catch (e) {
      dispatch(catchRegistrationRejected(e));
    }
  };

// consts
export const makeRegistration = (response: UserResponse) => ({
  type: REGISTRATION,
  response,
});
export const catchRegistrationRejected = (
  error: unknown
): IRegistrationRejected => ({
  type: REGISTRATION_REJECTED,
  error,
});
export const makeRegistrationRequest = (): IRegistrationRequest => ({
  type: REGISTRATION_REQUEST,
});
