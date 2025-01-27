import { UserResetPassword } from "../../utils/user-reset-password.type";

import { resetPassword } from "../../utils/api/data.service";

export type ActionType = {
  type: string;
  payload?: any;
};

//---- reset
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_REJECTED = "RESET_PASSWORD_REJECTED";
export const RESETTING_PASSWORD = "RESETTING_PASSWORD";

export const fetchResetPasswordThunk =
  (credits: UserResetPassword) =>
  async (dispatch: (action: ActionType) => void) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    try {
      const response = await resetPassword(credits);
      dispatch({ type: RESETTING_PASSWORD, payload: response });
    } catch (e) {
      dispatch({ type: RESET_PASSWORD_REJECTED, payload: e });
    }
  };
