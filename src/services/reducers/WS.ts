import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_USER_ORDERS,
} from "../constants";

import { TWSAction } from "../../utils/ws-action.type";

type TWSState = {
  wsConnected: boolean;
  error?: Event;
  messages?: never[];
};

const initialState: TWSState = {
  wsConnected: false,
};

export const wsReducer = (
  state = initialState,
  action: TWSAction
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    case WS_CONNECTION_START:
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: undefined,
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
        wsConnected: true,
        error: undefined,
      };
    default:
      return state;
  }
};
