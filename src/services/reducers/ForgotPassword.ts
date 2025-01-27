import {
  SENDING_EMAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REJECTED,
} from "../actions/ForgotPassword";

const initialState = {
  error: null,
  response: {},
  email: "",
};

export type ActionType = {
  type: string;
  payload?: any;
};

export const forgotPasswordReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SENDING_EMAIL: {
      return {
        ...state,
        response: action.payload,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        error: null,
        email: action.payload,
      };
    }
    case FORGOT_PASSWORD_REJECTED: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
};
