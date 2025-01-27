import {
  REGISTRATION,
  REGISTRATION_REQUEST,
  REGISTRATION_REJECTED,
} from "../actions/Registration";

import { ActionType } from "../../utils/action.type";

const initialState = {
  response: {},
  error: null,
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
