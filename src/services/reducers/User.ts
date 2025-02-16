import { IS_USER_AUTH, USER_GETTING } from "../constants";

import { TUserActions } from "../actions/User";
import { TLoginActions } from "../actions/Login";

type TUserState = {
  name?: string;
  email: string;
  password: string;
  isAuth: boolean;
};

const initialState: TUserState = {
  name: "",
  email: "",
  password: "",
  isAuth: false,
};

export const userReducer = (
  state = initialState,
  action: TUserActions | TLoginActions
): TUserState => {
  switch (action.type) {
    case USER_GETTING: {
      return {
        ...state,
        name: action.user?.name,
        email: action.user?.email,
        password: action.user?.password,
      };
    }
    case IS_USER_AUTH: {
      return {
        ...state,
        isAuth: action?.isAuth,
      };
    }
    default: {
      return state;
    }
  }
};
