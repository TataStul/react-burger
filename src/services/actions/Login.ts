import { UnknownAction } from "redux";

import { LOADING } from "./Loader";
import { fetchUserThunk, IS_USER_AUTH, USER_GETTING } from "./User";

import { UserRegister } from "../../utils/user-register.type";
import { UserResponse } from "../../utils/user-response.type";

import { loginUser, logout, refreshToken } from "../../utils/api/auth.service";
import { setCookie } from "../../utils/cookie-set";

export type ActionType = {
  type: string;
  payload?: any;
};

//---- auth
export const CHECKING_AUTH = "CHECKING_AUTH";
//---- login
export const LOGIN = "LOGIN";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REJECTED = "LOGIN_REJECTED";
//---- token
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_REJECTED = "REFRESH_TOKEN_REJECTED";
//---- logout
export const LOGOUT = "LOGOUT";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_REJECTED = "LOGOUT_REJECTED";

export const fetchLoginThunk =
  (credits: UserRegister) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      await loginUser(credits).then((response: UserResponse) => {
        setCookie("accessToken", response.accessToken!);
        localStorage.setItem("refreshToken", response.refreshToken!);
        dispatch({ type: LOGIN, payload: response });
        dispatch({ type: USER_GETTING, payload: response.user });
        dispatch({ type: CHECKING_AUTH, payload: true });
        dispatch({ type: IS_USER_AUTH, payload: true });
      });
    } catch (e) {
      dispatch({ type: LOGIN_REJECTED, payload: e });
      dispatch({ type: CHECKING_AUTH, payload: true });
      dispatch({ type: IS_USER_AUTH, payload: false });
    }
  };

export const fetchLogoutThunk =
  () => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: LOGOUT_REQUEST });

    try {
      await logout(localStorage.getItem("refreshToken")!).then(
        (response: UserResponse) => {
          setCookie("accessToken", "");
          localStorage.removeItem("refreshToken");
          dispatch({ type: LOGOUT, payload: response });
          dispatch({ type: CHECKING_AUTH, payload: true });
          dispatch({ type: USER_GETTING, payload: null });
          dispatch({ type: LOADING, payload: false });
          dispatch({ type: IS_USER_AUTH, payload: false });
        }
      );
    } catch (e) {
      dispatch({ type: LOGOUT_REJECTED, payload: e });
    }
  };

export const fetchRefreshTokenThunk =
  (fetchCallback: () => void) =>
  async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: REFRESH_TOKEN_REQUEST });

    try {
      await refreshToken(localStorage.getItem("refreshToken")!).then(
        (response: UserResponse) => {
          dispatch({ type: REFRESH_TOKEN, payload: response });
          setCookie("accessToken", response.accessToken!);
          localStorage.setItem("refreshToken", response.refreshToken!);
          fetchCallback();
        }
      );
    } catch (e: any) {
      if (e.status === 401 || e.status === 403) {
        dispatch(fetchLogoutThunk() as unknown as UnknownAction);
        dispatch({ type: CHECKING_AUTH, payload: true });
      }
      dispatch({ type: REFRESH_TOKEN_REJECTED, payload: e });
    }
  };

export const checkUserAuthThunk = () => {
  return (dispatch: (action: ActionType) => void) => {
    if (localStorage.getItem("refreshToken")) {
      dispatch(fetchUserThunk() as unknown as UnknownAction);
      dispatch({ type: CHECKING_AUTH, payload: true });
    } else {
      dispatch({ type: CHECKING_AUTH, payload: true });
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: IS_USER_AUTH, payload: false });
    }
  };
};
