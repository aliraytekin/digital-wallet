import Button from "../components/UI/Button"
import "./Home.css"

export default function Home() {
  return (
    <section className="hero">
      <h1>Manage Your Money Smarter</h1>
      <p>A secure bank with integrated fraud detection.</p>
      <Button text="Register now" to="/login" variant="primary-shining" ></Button>
    </section>
  )
}
