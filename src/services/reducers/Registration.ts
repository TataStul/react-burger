import {
  REGISTRATION,
  REGISTRATION_REQUEST,
  REGISTRATION_REJECTED,
} from "../actions/Registration";

const initialState = {
  response: {},
  error: null,
};

export type ActionType = {
  type: string;
  payload?: any;
};

export const registrationReducer = (
  state = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case REGISTRATION: {
      return {
        ...state,
        response: action.payload,
      };
    }
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case REGISTRATION_REJECTED: {
      return {
        ...state,
        error: action.payload?.error,
      };
    }
    default: {
      return state;
    }
  }
};
