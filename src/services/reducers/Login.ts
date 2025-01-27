import {
  CHECKING_AUTH,
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_REJECTED,
  LOGOUT,
  LOGOUT_REQUEST,
  LOGOUT_REJECTED,
} from "../actions/Login";

import { ActionType } from "../../utils/action.type";

const initialState = {
  error: null,
  success: false,
  checkingAuth: false,
  user: {
    name: "",
    email: "",
  },
  accessToken: "",
  refreshToken: "",
  logout: null,
};

export const loginReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CHECKING_AUTH: {
      return {
        ...state,
        checkingAuth: action.payload,
      };
    }
    case LOGIN: {
      return {
        ...state,
        success: true,
        checkingAuth: true,
        user: { ...action.payload.user },
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        logout: null,
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
        error: action.payload,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        logout: action.payload,
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
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
