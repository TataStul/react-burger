import {
  USER_GETTING,
  USER_REJECTED,
  USER_REQUEST,
  USER_UPDATING,
  USER_UPDATING_REJECTED,
  USER_UPDATING_REQUEST,
} from "../constants";

import { UserRegister } from "../../utils/user-register.type";
import { UserResponse } from "../../utils/user-response.type";
import { getUser, updateUser } from "../../utils/api/user.service";
import { checkAuth, fetchRefreshTokenThunk, isUserAuth } from "./Login";
import { UserLogin } from "../../utils/user-login.type";
import { AppDispatch, AppThunkAction } from "../types";

// interfaces
export interface IUserGetting {
  readonly type: typeof USER_GETTING;
  user: UserLogin;
}
export interface IUserRejected {
  readonly type: typeof USER_REJECTED;
  error: unknown;
}
export interface IUserRequest {
  readonly type: typeof USER_REQUEST;
}
export interface IUserUpdating {
  readonly type: typeof USER_UPDATING;
  response: UserResponse;
}
export interface IUserUpdatingRejected {
  readonly type: typeof USER_UPDATING_REJECTED;
  error: unknown;
}
export interface IUserUpdatingRequest {
  readonly type: typeof USER_UPDATING_REQUEST;
}

export type TUserActions =
  | IUserGetting
  | IUserRejected
  | IUserRequest
  | IUserUpdating
  | IUserUpdatingRequest
  | IUserUpdatingRejected;

export const fetchUserThunk: AppThunkAction =
  () => async (dispatch: AppDispatch) => {
    dispatch(makeUserGettingRequest());
    try {
      await getUser().then((response: UserResponse) => {
        dispatch(getUserRequest(response.user!));
        dispatch(checkAuth(true));
        dispatch(isUserAuth(true));
      });
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch(isUserAuth(false));
        dispatch(checkAuth(true));
        dispatch(fetchRefreshTokenThunk(() => dispatch(fetchUserThunk())));
      } else {
        dispatch(catchUserRequest(e));
      }
    }
  };

export const fetchUserUpdatingThunk: AppThunkAction =
  (credits: UserRegister) => async (dispatch: AppDispatch) => {
    dispatch(makeUserUpdatingRequest());
    try {
      await updateUser(credits).then((response: UserResponse) => {
        dispatch(getUserRequest(response.user!));
        dispatch(makeUserUpdating(response));
      });
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch(checkAuth(true));
        dispatch(
          fetchRefreshTokenThunk(() =>
            dispatch(fetchUserUpdatingThunk(credits))
          )
        );
      } else {
        dispatch(catchUserUpdating(e));
      }
    }
  };

// consts
export const getUserRequest = (user: UserLogin): IUserGetting => ({
  type: USER_GETTING,
  user,
});
export const catchUserRequest = (error: unknown): IUserRejected => ({
  type: USER_REJECTED,
  error,
});
export const makeUserGettingRequest = (): IUserRequest => ({
  type: USER_REQUEST,
});
export const makeUserUpdating = (response: UserResponse): IUserUpdating => ({
  type: USER_UPDATING,
  response,
});
export const makeUserUpdatingRequest = (): IUserUpdatingRequest => ({
  type: USER_UPDATING_REQUEST,
});
export const catchUserUpdating = (error: unknown): IUserUpdatingRejected => ({
  type: USER_UPDATING_REJECTED,
  error,
});
