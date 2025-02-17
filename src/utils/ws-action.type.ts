import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_USER_ORDERS,
  WS_SEND_MESSAGE,
} from "../services/constants";
import { IMessage } from "./message.interface";

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWSGetUserOrders {
  readonly type: typeof WS_GET_USER_ORDERS;
  readonly payload: string;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IMessage;
}

export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: { message: string };
}

export type TWSAction =
  | IWSGetMessageAction
  | IWSSendMessageAction
  | IWSConnectionClosedAction
  | IWSConnectionSuccessAction
  | IWSConnectionStart
  | IWSGetUserOrders
  | IWSConnectionErrorAction;
