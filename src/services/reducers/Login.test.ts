import { initialStateOfLogin, loginReducer } from "./Login";

import {
  catchLoginRejected,
  catchLogoutRejected,
  checkAuth,
  getLogin,
  makeLoginRequest,
  makeLogout,
  makeRequestOfLogin,
  TLoginActions,
} from "../actions/Login";

const testResponse = {
  success: true,
  user: {
    email: "a@a.ru",
    name: "a",
    password: "a",
  },
  accessToken: "a",
  refreshToken: "a",
  checkingAuth: true,
  logout: null,
};

describe("reducer: Login", () => {
  it("should return initial state", () => {
    expect(loginReducer(initialStateOfLogin, {} as TLoginActions)).toEqual(
      initialStateOfLogin
    );
  });
  it("should make login", () => {
    expect(loginReducer(initialStateOfLogin, getLogin(testResponse))).toEqual({
      ...initialStateOfLogin,
      accessToken: "a",
      checkingAuth: true,
      logout: null,
      refreshToken: "a",
      success: true,
      user: testResponse.user,
    });
  });
  it("should make login request", () => {
    expect(loginReducer(initialStateOfLogin, makeRequestOfLogin())).toEqual({
      ...initialStateOfLogin,
      error: null,
    });
  });
  it("should make logout", () => {
    expect(loginReducer(initialStateOfLogin, makeLogout(testResponse))).toEqual(
      {
        ...initialStateOfLogin,
        logout: testResponse,
        checkingAuth: false,
      }
    );
  });
  it("should make logout request", () => {
    expect(loginReducer(initialStateOfLogin, makeLoginRequest())).toEqual({
      ...initialStateOfLogin,
      error: null,
    });
  });
  it("should catch logout request", () => {
    expect(
      loginReducer(initialStateOfLogin, catchLogoutRejected({ error: "error" }))
    ).toEqual({
      ...initialStateOfLogin,
      error: {
        error: "error",
      },
    });
  });
  it("should checking auth", () => {
    expect(loginReducer(initialStateOfLogin, checkAuth(true))).toEqual({
      ...initialStateOfLogin,
      checkingAuth: true,
    });
  });
  it("should catch login request", () => {
    expect(
      loginReducer(
        initialStateOfLogin,
        catchLoginRejected({
          error: "error",
        })
      )
    ).toEqual({
      ...initialStateOfLogin,
      error: {
        error: "error",
      },
    });
  });
});
