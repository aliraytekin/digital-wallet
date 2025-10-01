import { LoginInput, RegisterInput } from "../types/user";

const API_URL = "http://localhost:3000/v1";

export async function login(input: LoginInput): Promise<string> {
  const res = await fetch(`${API_URL}/users/sign_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: input }),
  });

  if (!res.ok) throw new Error("Login failed");

  const token = res.headers.get("Authorization")?.replace("Bearer ", "");
  if (token) return token;

  const data = await res.json();
  if ("token" in data) return data.token;

  throw new Error("No token received");
}

export async function register(input: RegisterInput): Promise<string> {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: input }),
  });

  if (!res.ok) throw new Error("Registration failed");

  const token = res.headers.get("Authorization")?.replace("Bearer ", "");
  if (token) return token;

  const data = await res.json();
  if ("token" in data) return data.token;

  throw new Error("No token received");
}

export async function logout(token: string): Promise<void> {
  await fetch(`${API_URL}/users/sign_out`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}
