import {
  initialStateOfRegistration,
  registrationReducer,
} from "./Registration";

import {
  catchRegistrationRejected,
  makeRegistration,
  makeRegistrationRequest,
  TRegistrationActions,
} from "../actions/Registration";

import { UserResponse } from "../../utils/user-response.type";

const testResponse: UserResponse = {
  success: true,
  user: {
    email: "a@a.ru",
    password: "a",
    name: "a",
  },
};

describe("reducer: Registration", () => {
  it("should return initial state", () => {
    expect(
      registrationReducer(
        initialStateOfRegistration,
        {} as TRegistrationActions
      )
    ).toEqual(initialStateOfRegistration);
  });
  it("should catch registration request", () => {
    expect(
      registrationReducer(
        initialStateOfRegistration,
        catchRegistrationRejected({
          error: "error",
        })
      )
    ).toEqual({
      ...initialStateOfRegistration,
      error: {
        error: "error",
      },
    });
  });
  it("should get registration", () => {
    expect(
      registrationReducer(
        initialStateOfRegistration,
        makeRegistration(testResponse)
      )
    ).toEqual({
      ...initialStateOfRegistration,
      response: testResponse,
    });
  });
  it("should make registration request", () => {
    expect(
      registrationReducer(initialStateOfRegistration, makeRegistrationRequest())
    ).toEqual({
      ...initialStateOfRegistration,
      error: null,
    });
  });
});
