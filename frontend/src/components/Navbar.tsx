import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        TravelTrove
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/trip-itineraries">Browse Itineraries</Link>
        <Link to="/create-itinerary">Create Itinerary</Link>

        {isAuthenticated() && <Link to="/favourites">Favourites</Link>}
        {isAuthenticated() && <Link to="/travel-groups">Travel Groups</Link>}
        {isAdmin() && <Link to="/admin">Admin</Link>}

        {!isAuthenticated() ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
