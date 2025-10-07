import { useState, useEffect, useCallback } from "react";
import { loginUser, registerUser } from "../api/auth";
import { useNavigate } from "react-router";
import type { AuthUser } from "../types/user";

export function useAuth() {
  const navigate = useNavigate();
  const TOKEN_EXPIRY_MINUTES = 30;

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const createdAt = localStorage.getItem("token_created_at");

    if (savedToken && createdAt) {
      const ageMinutes =
        (Date.now() - parseInt(createdAt, 10)) / 1000 / 60;

      if (ageMinutes < TOKEN_EXPIRY_MINUTES) {
        setUser({
          token: savedToken,
          createdAt: parseInt(createdAt, 10),
        });
      } else {
        logout();
      }
    }

    setLoading(false);
  }, []);

  const register = useCallback(
    async (email: string, password: string, password_confirmation: string) => {
      try {
        setLoading(true);
        const { token } = await registerUser({ email, password, password_confirmation });
        const createdAt = Date.now();

        setUser({ token, createdAt });
        localStorage.setItem("token", token);
        localStorage.setItem("token_created_at", createdAt.toString());
        navigate("/dashboard");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Registration failed");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        const { token } = await loginUser({ email, password });
        const createdAt = Date.now();

        setUser({ token, createdAt });
        localStorage.setItem("token", token);
        localStorage.setItem("token_created_at", createdAt.toString());
        navigate("/dashboard");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Login failed");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("token_created_at");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (!user) return

    const remainingTime =
      TOKEN_EXPIRY_MINUTES * 60 * 1000 - (Date.now() - user.createdAt);

    const timer = setTimeout(() => {
      logout();
    }, remainingTime)

    return() => clearTimeout(timer);
  }, [user, logout])

  return { user, loading, error, register, login, logout };
}
