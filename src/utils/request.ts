import { checkResponse } from "./check-response";

export function request(url: string, options?: RequestInit) {
  const apiUrl = "https://norma.nomoreparties.space/api";

  return fetch(`${apiUrl}${url}`, options).then(checkResponse);
}
