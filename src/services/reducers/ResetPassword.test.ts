import {
  initialStateOfResetPassword,
  resetPasswordReducer,
} from "./ResetPassword";

import {
  catchResetPasswordThunk,
  makeResetPassword,
  makeResetPasswordRequest,
  TResetPasswordAction,
} from "../actions/ResetPassword";

import { UserResponse } from "../..//utils/user-response.type";

const testResponse: UserResponse = {
  success: true,
};

describe("reducer: ResetPassword", () => {
  it("should return initial state", () => {
    expect(
      resetPasswordReducer(
        initialStateOfResetPassword,
        {} as TResetPasswordAction
      )
    ).toEqual(initialStateOfResetPassword);
  });
  it("should get request password", () => {
    expect(
      resetPasswordReducer(
        initialStateOfResetPassword,
        makeResetPasswordRequest()
      )
    ).toEqual({
      ...initialStateOfResetPassword,
      error: null,
    });
  });
  it("should catch password request", () => {
    expect(
      resetPasswordReducer(
        initialStateOfResetPassword,
        catchResetPasswordThunk({
          error: "error",
        })
      )
    ).toEqual({
      ...initialStateOfResetPassword,
      error: {
        error: "error",
      },
    });
  });
  it("should make request password", () => {
    expect(
      resetPasswordReducer(
        initialStateOfResetPassword,
        makeResetPassword(testResponse)
      )
    ).toEqual({
      ...initialStateOfResetPassword,
      response: testResponse,
    });
  });
});
