import { request } from "../request";

enum Request {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  PUT = "PUT",
}

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

export { getData, makeOrder };
