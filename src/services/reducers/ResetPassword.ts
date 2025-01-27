import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REJECTED,
  RESETTING_PASSWORD,
} from "../actions/ResetPassword";

const initialState = {
  email: "",
  response: {},
  error: null,
};

export type ActionType = {
  type: string;
  payload?: any;
};

export const resetPasswordReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case RESET_PASSWORD_REJECTED: {
      return {
        ...state,
        error: action.payload?.error,
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
        response: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
