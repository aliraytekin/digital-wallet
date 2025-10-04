import {Link} from "react-router"
import "./Button.css"

interface ButtonProps {
  text: string;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "primary-outline" | "secondary" | "secondary-outline"
}

export default function Button({ text, to, onClick, variant = "primary" }: ButtonProps) {
  if (to) {
    return(
      <Link to={to} className={`btn ${variant}`}>
        {text}
      </Link>
    )
  }
  return(
    <button className={`btn ${variant}`} onClick={onClick}>
      {text}
    </button>
  )
}
