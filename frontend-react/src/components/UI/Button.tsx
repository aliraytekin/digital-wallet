import {Link} from "react-router"
import "../../styles/button.css"

interface ButtonProps {
  text: string;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "primary-outline" | "primary-shining" | "secondary" | "secondary-outline"
}

export default function Button({ text, to, onClick, variant = "primary" }: ButtonProps) {
    const className = `btn ${variant}`;

    return to ? (
      <Link to={to} className={className}>
        {text}
      </Link>
    ) : (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  )
}
