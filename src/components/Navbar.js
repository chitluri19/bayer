import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Jayakrishna Hospital
        </Link>
        <div className="collapse navbar-collapse justify-content-end">
          <Link className="nav-link text-white" to="/login">
            Login
          </Link>
          <Link className="nav-link text-white ms-3" to="/register">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
