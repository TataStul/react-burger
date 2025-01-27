import { UserLogin } from "./user-login.type";

export type UserResponse = {
  success: boolean;
  error?: string;
  user?: UserLogin;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
};
