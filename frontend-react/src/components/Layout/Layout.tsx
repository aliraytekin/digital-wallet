import { ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Button from "../UI/Button"
import "../../styles/layout.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return(
    <div className="layout">
      <nav className="navbar">
        <Link to="/" className="logo">Canto</Link>
        <ul className="nav-links">
          {user ? (
            <>
              <li><Button to="/dashboard" text="Dashboard"></Button></li>
              <li><Button to="/transactions" text="Transactions" /></li>
              <li><Button onClick={handleLogout} text="Log out" /></li>
            </>
          ) : (
            <>
              <li><Button to="/login" text="Sign in" variant="primary-outline" /></li>
              <li><Button to="/register" text="Sign up" /></li>
            </>
          )}
        </ul>
      </nav>
      <main className="content">{children}</main>
    </div>
  )
}
