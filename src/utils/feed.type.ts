import { Status } from "../utils/status.enum";

export type Feed = {
  success: boolean;
  orders: FeedDetail[];
  total: number;
  totalToday: number;
};

export type FeedDetail = {
  _id: string;
  status: Status | string;
  name: string;
  number: number;
  ingredients: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
};
