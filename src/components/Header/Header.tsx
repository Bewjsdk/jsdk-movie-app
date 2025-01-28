import { ReactNode } from "react"
import heroImage from "/hero-img.png"

const Header = ({ children }: {children: ReactNode}) => {
  return (
    <header>
      <img src={heroImage} alt="3 movie cards" />
      <h1>
        Enjoy <span className="text-gradient">Movie</span> discovery, <br />
        Made <span className="text-gradient">simple</span>.
      </h1>
      {children}
    </header>
  )
}

export default Header
