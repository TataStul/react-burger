import { Reducer } from "react";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";

import { composeWithDevTools } from "@redux-devtools/extension";

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_USER_ORDERS,
  WS_SEND_MESSAGE,
} from "./constants";

import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware";
import { TWSStoreActions } from "../utils/ws-store-actions.type";

const wsUrl = "wss://norma.nomoreparties.space/";

const wsActions: TWSStoreActions = {
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  wsGetUserOrder: WS_GET_USER_ORDERS,
};

const store = createStore(
  rootReducer as Reducer<any, any>,
  composeWithDevTools(
    applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
  )
);

export default store;
