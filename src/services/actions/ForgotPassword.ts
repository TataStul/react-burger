import { rememberPassword } from "../../utils/api/data.service";

export type ActionType = {
  type: string;
  payload?: any;
};

export const SENDING_EMAIL = "SENDING_EMAIL";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_REJECTED = "FORGOT_PASSWORD_REJECTED";

export const fetchForgotPasswordThunk =
  (email: string) => async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST, payload: email });

    try {
      const response = await rememberPassword(email);
      dispatch({ type: SENDING_EMAIL, payload: response });
    } catch (e) {
      dispatch({ type: FORGOT_PASSWORD_REJECTED, payload: e });
    }
  };
