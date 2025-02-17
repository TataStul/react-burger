import { Status } from "../utils/status.enum";

export type Feed = {
  success: boolean;
  orders: FeedDetail[];
  total: number;
  totalToday: number;
};

export type FeedDetail = {
  _id: string;
  status: Status;
  name: string;
  number: string;
  ingredients: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
};
