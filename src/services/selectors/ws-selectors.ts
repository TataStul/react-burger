import { RootState } from "../types";

export const getMessages = (store: RootState) =>
  (store as { chat: { messages: [] } }).chat.messages || [];
