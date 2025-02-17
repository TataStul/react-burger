import { Middleware, MiddlewareAPI } from "redux";

import { getFeedsActions } from "../actions/Feeds";
import { closeConnection } from "../actions/WS";
import { TWSStoreActions } from "../../utils/ws-store-actions.type";
import { AppActions, AppDispatch, RootState } from "../types";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWSStoreActions
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    const { wsInit, wsGetUserOrder } = wsActions;
    return (next) => (action: AppActions) => {
      const { dispatch } = store;
      const { type } = action;
      if (type === wsInit || type === wsGetUserOrder) {
        if ("payload" in action) {
          socket = new WebSocket(`${wsUrl}${action.payload}`);
        }
      }
      if (socket) {
        socket.onopen = (event: Event) => {
          console.log("Socket opened");
        };
        socket.onmessage = (event: MessageEvent) => {
          console.log(`Получены данные: ${event.data}`);
          dispatch(getFeedsActions(event.data));
        };
        socket.onerror = () => {
          dispatch(closeConnection());
        };
        socket.onclose = (event: Event) => {
          dispatch(closeConnection());
        };
      }
      next(action);
    };
  }) as Middleware;
};
