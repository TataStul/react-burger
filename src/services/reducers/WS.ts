import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_USER_ORDERS,
} from "../constants";

import { TWsActions } from "../actions/WS";

type TWSState = {
  wsConnected: boolean;
  error?: unknown;
  messages?: never[];
};

export const initialStateOfWs: TWSState = { wsConnected: false };

export const wsReducer = (
  state = initialStateOfWs,
  action: TWsActions
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.error,
        wsConnected: false,
      };
    case WS_CONNECTION_START:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [],
      };
    case WS_GET_USER_ORDERS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    default:
      return state;
  }
};
