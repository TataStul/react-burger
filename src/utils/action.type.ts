import { UserRegister } from "./user-register.type";
import { Ingredient } from "./ingredient.type";
import { Order } from "./order.type";
import { UserResponse } from "./user-response.type";
import { Feed } from "./feed.type";

export type ActionType = {
  type: string;
  order?: Order;
  error?: unknown;
  ingredients?: Ingredient[];
  email?: string;
  response?: UserResponse;
  user?: UserRegister;
  accessToken?: string;
  refreshToken?: string;
  logout?: UserResponse;
  checkingAuth?: boolean;
  isAuth?: boolean;
  ingredient?: Ingredient;
  bun?: Ingredient;
  burgerConstructor?: Ingredient[];
  amount?: number;
  feeds?: Feed;
  feed?: Feed;
  payload?: {
    error?: unknown;
    name?: string;
    email?: string;
    user?: UserRegister;
    accessToken?: string;
    refreshToken?: string;
    logout?: UserResponse;
    checkingAuth?: boolean;
    ingredient?: Ingredient;
    burgerConstructor?: Ingredient[];
    amount?: number;
    feeds?: Feed;
    password?: string;
    data?: unknown;
    loading?: boolean;
  };
};
