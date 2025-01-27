import { IS_USER_AUTH, USER_GETTING } from "../actions/User";

import { ActionType } from "../../utils/action.type";

const initialState = {
  name: "",
  email: "",
  password: "",
  isAuth: false,
};

export const userReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case USER_GETTING: {
      return {
        ...state,
        name: action.payload?.name,
        email: action.payload?.email,
        password: action.payload?.password,
      };
    }
    case IS_USER_AUTH: {
      return {
        ...state,
        isAuth: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
