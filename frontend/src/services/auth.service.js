import { apiRequest } from "./api";

export async function loginApi(email, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
