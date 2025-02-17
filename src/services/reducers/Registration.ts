import {
  REGISTRATION,
  REGISTRATION_REQUEST,
  REGISTRATION_REJECTED,
} from "../constants";

import { UserResponse } from "../../utils/user-response.type";
import { TRegistrationActions } from "../actions/Registration";

type TRegistrationState = {
  response?: UserResponse;
  error: unknown;
};

export const initialStateOfRegistration: TRegistrationState = { error: null };

export const registrationReducer = (
  state = initialStateOfRegistration,
  action: TRegistrationActions
): TRegistrationState => {
  switch (action.type) {
    case REGISTRATION: {
      return {
        ...state,
        response: action?.response,
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
        error: action?.error,
      };
    }
    default: {
      return state;
    }
  }
};
