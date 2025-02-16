import {
  CHECKING_AUTH,
  IS_USER_AUTH,
  LOADING,
  LOGIN,
  LOGIN_REJECTED,
  LOGIN_REQUEST,
  LOGOUT,
  LOGOUT_REJECTED,
  LOGOUT_REQUEST,
  REFRESH_TOKEN,
  REFRESH_TOKEN_REJECTED,
  REFRESH_TOKEN_REQUEST,
  USER_GETTING,
} from "../constants";

import { UserRegister } from "../../utils/user-register.type";
import { UserResponse } from "../../utils/user-response.type";
import { loginUser, logout, refreshToken } from "../../utils/api/auth.service";
import { setCookie } from "../../utils/cookie-set";
import { UserLogin } from "../../utils/user-login.type";
import { AppDispatch, AppThunkAction } from "../types";
import { fetchUserThunk } from "./User";

// interfaces
export interface ICheckAuth {
  readonly type: typeof CHECKING_AUTH;
  checkingAuth: boolean;
}
export interface IIsUserAuth {
  readonly type: typeof IS_USER_AUTH;
  isAuth: boolean;
}
export interface ILoading {
  readonly type: typeof LOADING;
  loading: boolean;
}
export interface IGetLogin {
  readonly type: typeof LOGIN;
  response: UserResponse;
}
export interface ILoginRejected {
  readonly type: typeof LOGIN_REJECTED;
  error: unknown;
}
export interface IMakeLoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}
export interface IMakeLogout {
  readonly type: typeof LOGOUT;
  response: UserResponse;
}
export interface ILogoutRejected {
  readonly type: typeof LOGOUT_REJECTED;
  error: unknown;
}
export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface IRefreshToken {
  readonly type: typeof REFRESH_TOKEN;
  response: UserResponse;
}
export interface IRefreshTokenRejected {
  readonly type: typeof REFRESH_TOKEN_REJECTED;
  error: unknown;
}
export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IGetUser {
  readonly type: typeof USER_GETTING;
  user: UserLogin;
}

export type TLoginActions =
  | ICheckAuth
  | IIsUserAuth
  | ILoading
  | IGetLogin
  | ILoginRejected
  | IMakeLoginRequest
  | IMakeLogout
  | ILogoutRejected
  | ILogoutRequest
  | IRefreshToken
  | IRefreshTokenRejected
  | IRefreshTokenRequest
  | IGetUser;

export const fetchLoginThunk: AppThunkAction =
  (credits: UserRegister) => async (dispatch: AppDispatch) => {
    dispatch(makeRequestOfLogin());
    try {
      await loginUser(credits).then((response: UserResponse) => {
        setCookie("accessToken", response.accessToken!);
        localStorage.setItem("refreshToken", response.refreshToken!);
        dispatch(getLogin(response));
        dispatch(getUser(response.user!));
        dispatch(checkAuth(true));
        dispatch(isUserAuth(true));
      });
    } catch (e) {
      dispatch(catchLoginRejected(e));
      dispatch(checkAuth(true));
      dispatch(isUserAuth(false));
    }
  };

export const fetchLogoutThunk: AppThunkAction =
  () => async (dispatch: AppDispatch) => {
    dispatch(makeLoginRequest());
    try {
      await logout(localStorage.getItem("refreshToken")!).then(
        (response: UserResponse) => {
          setCookie("accessToken", "", { expires: 0 });
          localStorage.removeItem("refreshToken");
          dispatch(makeLogout(response));
          dispatch(checkAuth(true));
          dispatch(getUser({ name: undefined, email: "", password: "" }));
          dispatch(makeLoading(false));
          dispatch(isUserAuth(false));
        }
      );
    } catch (e) {
      dispatch(catchLogoutRejected(e));
    }
  };

export const fetchRefreshTokenThunk: AppThunkAction =
  (fetchCallback: () => void) => async (dispatch: AppDispatch) => {
    dispatch(makeRefreshToken());
    try {
      await refreshToken(localStorage.getItem("refreshToken")!).then(
        (response: UserResponse) => {
          dispatch(getRefreshToken(response));
          setCookie("accessToken", "", { expires: 0 });
          setCookie("accessToken", response.accessToken!);
          localStorage.setItem("refreshToken", response.refreshToken!);
          fetchCallback();
        }
      );
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch(fetchLogoutThunk());
        dispatch(checkAuth(true));
      }
      dispatch(catchRefreshTokenRejected(e));
    }
  };

export const checkUserAuthThunk: AppThunkAction =
  () => (dispatch: AppDispatch) => {
    if (localStorage.getItem("refreshToken")) {
      dispatch(fetchUserThunk());
      dispatch(checkAuth(true));
    } else {
      dispatch(checkAuth(true));
      dispatch(makeLoading(false));
      dispatch(isUserAuth(false));
    }
  };

// consts
export const checkAuth = (checkingAuth: boolean): ICheckAuth => ({
  type: CHECKING_AUTH,
  checkingAuth,
});
export const isUserAuth = (isAuth: boolean): IIsUserAuth => ({
  type: IS_USER_AUTH,
  isAuth,
});
export const makeLoading = (loading: boolean): ILoading => ({
  type: LOADING,
  loading,
});
export const getLogin = (response: UserResponse): IGetLogin => ({
  type: LOGIN,
  response,
});
export const catchLoginRejected = (error: unknown): ILoginRejected => ({
  type: LOGIN_REJECTED,
  error,
});
export const makeRequestOfLogin = (): IMakeLoginRequest => ({
  type: LOGIN_REQUEST,
});
export const makeLogout = (response: UserResponse): IMakeLogout => ({
  type: LOGOUT,
  response,
});
export const catchLogoutRejected = (error: unknown): ILogoutRejected => ({
  type: LOGOUT_REJECTED,
  error,
});
export const makeLoginRequest = (): ILogoutRequest => ({
  type: LOGOUT_REQUEST,
});
export const getRefreshToken = (response: UserResponse): IRefreshToken => ({
  type: REFRESH_TOKEN,
  response,
});
export const catchRefreshTokenRejected = (
  error: unknown
): IRefreshTokenRejected => ({
  type: REFRESH_TOKEN_REJECTED,
  error,
});
export const makeRefreshToken = (): IRefreshTokenRequest => ({
  type: REFRESH_TOKEN_REQUEST,
});
export const getUser = (user: UserLogin): IGetUser => ({
  type: USER_GETTING,
  user,
});
