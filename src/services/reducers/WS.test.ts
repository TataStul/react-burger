import {
  closeConnection,
  catchConnectionError,
  initWs,
  checkSuccessConnection,
  getMessageWithWs,
  getUserOrders,
  TWsActions,
} from "../actions/WS";

import { initialStateOfWs, wsReducer } from "./WS";

import { getCookie } from "../../utils/cookie-get";

describe("reducer: WS", () => {
  it("should return initial state", () => {
    expect(wsReducer(initialStateOfWs, {} as TWsActions)).toEqual(
      initialStateOfWs
    );
  });
  it("should catch connection error", () => {
    expect(
      wsReducer(
        initialStateOfWs,
        catchConnectionError({
          error: "error",
        })
      )
    ).toEqual({
      ...initialStateOfWs,
      error: { error: "error" },
    });
  });
  it("should get message", () => {
    expect(wsReducer(initialStateOfWs, getMessageWithWs())).toEqual({
      ...initialStateOfWs,
      error: undefined,
      messages: [],
    });
  });
  it("should init webSocket", () => {
    expect(wsReducer(initialStateOfWs, initWs("orders/all"))).toEqual({
      ...initialStateOfWs,
      error: undefined,
      wsConnected: false,
    });
  });
  it("should make connection close", () => {
    expect(wsReducer(initialStateOfWs, closeConnection())).toEqual({
      ...initialStateOfWs,
      error: undefined,
      wsConnected: false,
    });
  });
  it("should success connect", () => {
    expect(wsReducer(initialStateOfWs, checkSuccessConnection())).toEqual({
      ...initialStateOfWs,
      error: undefined,
      wsConnected: true,
    });
  });
  it("should get user orders", () => {
    expect(
      wsReducer(
        initialStateOfWs,
        getUserOrders(
          `orders?token=${getCookie("accessToken")?.split("Bearer ")[1]}`
        )
      )
    ).toEqual({
      ...initialStateOfWs,
      error: undefined,
      wsConnected: true,
    });
  });
});
