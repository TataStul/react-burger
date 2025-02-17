import {
  RESET_PASSWORD_REJECTED,
  RESET_PASSWORD_REQUEST,
  RESETTING_PASSWORD,
} from "../constants";

// import { ActionType } from "../../utils/action.type";

import { UserResponse } from "../..//utils/user-response.type";
import { TResetPasswordAction } from "../actions/ResetPassword";

type TResetPasswordState = {
  email: string;
  error: unknown;
  response?: UserResponse;
};

const initialState = {
  email: "",
  error: null,
};

export const resetPasswordReducer = (
  state = initialState,
  action: TResetPasswordAction
): TResetPasswordState => {
  switch (action.type) {
    case RESET_PASSWORD_REJECTED: {
      return {
        ...state,
        error: action?.error,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case RESETTING_PASSWORD: {
      return {
        ...state,
        response: action.response,
      };
    }
    default: {
      return state;
    }
  }
};
