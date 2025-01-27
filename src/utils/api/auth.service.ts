import { request } from "../request";
import { Request } from "../request.enum";

import { UserRegister } from "../user-register.type";
import { UserLogin } from "../user-login.type";

const registerUser = (credits: UserRegister) => {
  return request(`/auth/register`, {
    method: Request.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credits),
  });
};

const loginUser = (credits: UserLogin) => {
  return request(`/auth/login`, {
    method: Request.POST,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(credits),
  });
};

const logout = (token: string) => {
  return request(`/auth/logout`, {
    method: Request.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
};

const refreshToken = (token: string) => {
  return request(`/auth/token`, {
    method: Request.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
};

export { registerUser, loginUser, logout, refreshToken };
