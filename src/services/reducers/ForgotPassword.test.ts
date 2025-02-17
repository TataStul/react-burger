import {
  catchErrorOfForgotPassword,
  makeRequestOfForgotPassword,
  sendEmail,
  TForgotPasswordActions,
} from "../actions/ForgotPassword";

import {
  forgotPasswordReducer,
  initialStateOfForgotPassword,
} from "./ForgotPassword";

import { UserResponse } from "../../utils/user-response.type";

const testResponse: UserResponse = {
  success: true,
};

describe("reducer: ForgotPassword", () => {
  it("should return initial state", () => {
    expect(
      forgotPasswordReducer(
        initialStateOfForgotPassword,
        {} as TForgotPasswordActions
      )
    ).toEqual(initialStateOfForgotPassword);
  });
  it("should catch error forgot password", () => {
    expect(
      forgotPasswordReducer(
        initialStateOfForgotPassword,
        catchErrorOfForgotPassword({
          error: "error",
        })
      )
    ).toEqual({
      ...initialStateOfForgotPassword,
      error: {
        error: "error",
      },
    });
  });
  it("should send email", () => {
    expect(
      forgotPasswordReducer(
        initialStateOfForgotPassword,
        sendEmail(testResponse)
      )
    ).toEqual({
      ...initialStateOfForgotPassword,
      response: testResponse,
    });
  });
  it("should request password", () => {
    expect(
      forgotPasswordReducer(
        initialStateOfForgotPassword,
        makeRequestOfForgotPassword("a@a.ru")
      )
    ).toEqual({
      ...initialStateOfForgotPassword,
      email: "a@a.ru",
    });
  });
});
