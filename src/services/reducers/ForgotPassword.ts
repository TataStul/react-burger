import {
  FORGOT_PASSWORD_REJECTED,
  FORGOT_PASSWORD_REQUEST,
  SENDING_EMAIL,
} from "../constants";

import { TForgotPasswordActions } from "../actions/ForgotPassword";
import { UserResponse } from "../../utils/user-response.type";

type TForgotPasswordState = {
  error: unknown;
  email: string;
  response?: UserResponse;
};

const initialState: TForgotPasswordState = {
  error: null,
  email: "",
};

export const forgotPasswordReducer = (
  state = initialState,
  action: TForgotPasswordActions
): TForgotPasswordState => {
  switch (action.type) {
    case FORGOT_PASSWORD_REJECTED: {
      return {
        ...state,
        error: action?.error,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        error: null,
        email: action?.email,
      };
    }
    case SENDING_EMAIL: {
      return {
        ...state,
        response: action?.response,
      };
    }
    default: {
      return state;
    }
  }
};
