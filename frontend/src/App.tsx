import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DestinationDetails from "./pages/DestinationDetails";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";

/**
 * Basic App skeleton with routes.
 * All pages are temporary placeholders to avoid errors.
 */

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main style={{ padding: 16 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/destination/:id" element={<DestinationDetails />} />
            <Route path="/itinerary" element={<ItineraryBuilder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
