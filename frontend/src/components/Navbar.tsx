import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          Traveltrove
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/itinerary">Itinerary</Link></li>
        <li><Link to="/groups">Groups</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        {user ? (
          <>
            <li><Link to="/profile">{user.name}</Link></li>
            <li><button style={{ background: "transparent", color: "white", border: "none", cursor: "pointer" }} onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
