import { useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/auth";
import { useNavigate } from "react-router"
import { User } from "../types/user"

export function useAuth() {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null >(null);
  const [user, setUser] = useState<User | null >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      if (savedToken) setToken(savedToken);

      if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  async function register(email: string, password: string, password_confirmation: string) {
    try {
      setLoading(true)
      const { token, user } = await registerUser({email, password, password_confirmation})
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Registration failed");
      } else {
        setError("Something went wrong")
      }
    } finally {
      setLoading(false)
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const { token, user } = await loginUser({email, password});
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/")
    } catch (err: any) {
      setError(err.message || "Login failed" );
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return { user, token, loading, error, register, login, logout };
}
