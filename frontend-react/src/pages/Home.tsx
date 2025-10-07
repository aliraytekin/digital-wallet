import Button from "../components/UI/Button"
import { useAuth } from "../hooks/useAuth"
import "../styles/home.css"

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <section className="hero">
        <h1>Manage Your Money Smarter</h1>
        <p>A secure bank with integrated fraud detection and real-time analytics *</p>
        {user ? (
          <Button text="Dashboard" to="/dashboard" variant="primary-shining" className="btn-bigger"></Button>
        ) : (
          <Button text="Register now" to="/register" variant="primary-shining" className="btn-bigger"></Button>
        )}
        </section>

      <section className="features">
        <h2>Why Use Digital Wallet?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Secure</h3>
            <p>Your transactions are protected with encryption and secure APIs.</p>
          </div>
          <div className="feature-card">
            <h3>Fraud Detection</h3>
            <p>We flag suspicious transactions in real-time using advanced rules.</p>
          </div>
          <div className="feature-card">
            <h3>Analytics</h3>
            <p>Track your spending habits with interactive charts and insights.</p>
          </div>
        </div>
      </section>
    </>
  )
}
