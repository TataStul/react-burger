import { request } from "../request";
import { Request } from "../request.enum";

import { UserResetPassword } from "../user-reset-password.type";

const getData = () => {
  return request(`/ingredients`);
};

const makeOrder = (ingredients: string[]) => {
  return request(`/orders`, {
    method: Request.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
  });
};

const rememberPassword = (email: string) => {
  return request(`/password-reset`, {
    method: Request.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

const resetPassword = (credits: UserResetPassword) => {
  return request(`/password-reset/reset`, {
    method: Request.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credits),
  });
};

export { getData, makeOrder, rememberPassword, resetPassword };
