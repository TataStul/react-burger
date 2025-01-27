import { UserRegister } from "../../utils/user-register.type";

import { registerUser } from "../../utils/api/auth.service";
import { setCookie } from "../../utils/cookie-set";

export type ActionType = {
  type: string;
  payload?: any;
};

//---- register
export const REGISTRATION = "REGISTRATION";
export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_REJECTED = "REGISTRATION_REJECTED";

export const fetchRegisterThunk =
  (credits: UserRegister) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: REGISTRATION_REQUEST });

    try {
      await registerUser(credits).then((response) => {
        setCookie("accessToken", response.accessToken!);
        localStorage.setItem("refreshToken", response.refreshToken);
        dispatch({ type: REGISTRATION, payload: response });
      });
    } catch (e) {
      dispatch({ type: REGISTRATION_REJECTED });
    }
  };
