import {
  CHECKING_AUTH,
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_REJECTED,
  LOGOUT,
  LOGOUT_REQUEST,
  LOGOUT_REJECTED,
} from "../constants";

import { UserLogin } from "../../utils/user-login.type";
import { UserResponse } from "../../utils/user-response.type";
import { TLoginActions } from "../actions/Login";

type TLoginState = {
  error: unknown;
  accessToken?: string;
  refreshToken?: string;
  success: boolean;
  user?: UserLogin;
  logout?: UserResponse | null;
  checkingAuth?: boolean;
};

export const initialStateOfLogin: TLoginState = {
  error: null,
  accessToken: "",
  refreshToken: "",
  success: false,
  user: {
    name: "",
    email: "",
    password: "",
  },
  logout: null,
  checkingAuth: false,
};

export const loginReducer = (
  state = initialStateOfLogin,
  action: TLoginActions
): TLoginState => {
  switch (action.type) {
    case CHECKING_AUTH: {
      return {
        ...state,
        checkingAuth: action?.checkingAuth,
      };
    }
    case LOGIN: {
      return {
        ...state,
        accessToken: action.response?.accessToken,
        refreshToken: action.response?.refreshToken,
        success: true,
        user: action.response?.user,
        logout: null,
        checkingAuth: true,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case LOGIN_REJECTED: {
      return {
        ...state,
        error: action?.error,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        logout: action?.response,
        checkingAuth: false,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case LOGOUT_REJECTED: {
      return {
        ...state,
        error: action?.error,
      };
    }
    default: {
      return state;
    }
  }
};
