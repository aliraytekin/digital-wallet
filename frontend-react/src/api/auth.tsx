import { UserLoginInput, UserRegisterInput, User } from "../types/user";

const API_URL = "http://localhost:4000/";

export async function registerUser(input: UserRegisterInput): Promise<{ token: string, user: User }> {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: input }),
  });

  if (!res.ok) throw new Error("Registration failed");

  const token = res.headers.get("Authorization")?.replace("Bearer ", "");
  const data = await res.json();

  return {
    token: token || data.token,
    user: data.user
  }
}

export async function loginUser(input: UserLoginInput): Promise<{ token: string, user: User }> {
  const res = await fetch(`${API_URL}/sign_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: input }),
  })

  if (!res.ok) throw new Error("Login failed");

  const token = res.headers.get("Authorization")?.replace("Bearer ", "");
  const data = await res.json();

  return {
    token: token || data.token,
    user: data.user
  }
}


export async function logoutUser(token: string): Promise<void> {
  await fetch(`${API_URL}/users/sign_out`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}
