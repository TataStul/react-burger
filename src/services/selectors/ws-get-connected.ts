import { RootState } from "../types";

export const getWsConnected = (state: RootState) =>
  (state as { chat: { wsConnected: any } }).chat.wsConnected;
