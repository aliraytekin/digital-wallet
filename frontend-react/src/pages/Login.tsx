import {useAuth} from "../hooks/useAuth"
import { useState } from "react";
import "../styles/login.css"

export default function Login() {
  const { error, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  }

  return(
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn primary">Login</button>
        <p className="register-link">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  )
}
