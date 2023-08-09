import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>5 Great Hikes</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
