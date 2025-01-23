import { request } from "../request";
import { Request } from "../request.enum";

import { getCookie } from "../cookie-get";
import { UserRegister } from "../user-register.type";

const updateUser = (credits: UserRegister) => {
  return request(`/auth/user`, {
    method: Request.PATCH,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken")!,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(credits),
  });
};

const getUser = () => {
  return request(`/auth/user`, {
    method: Request.GET,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken")!,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};

export { getUser, updateUser };
