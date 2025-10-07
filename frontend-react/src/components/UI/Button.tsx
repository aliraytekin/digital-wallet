import {Link} from "react-router"
import "../../styles/button.css"

interface ButtonProps {
  text: string;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "primary-outline" | "primary-shining" | "secondary" | "secondary-outline"
  className?: string;
}

export default function Button({ text, to, onClick, variant = "primary", className }: ButtonProps) {
    const btn_variant = `btn ${variant}`;

    return to ? (
      <Link to={to} className={`${btn_variant} ${className}`}>
        {text}
      </Link>
    ) : (
    <button className={`${btn_variant} ${className}`} onClick={onClick}>
      {text}
    </button>
  )
}
