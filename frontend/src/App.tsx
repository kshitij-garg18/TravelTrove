import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DestinationDetails from './pages/DestinationDetails';
import CreateItinerary from './pages/CreateItinerary';
import ItineraryDetails from './pages/ItineraryDetails';
import Itineraries from './pages/Itineraries';
import Favourites from './pages/Favourites';
import TravelGroups from './pages/TravelGroups';
import Admin from './pages/Admin';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/destination-guides/:id" element={<DestinationDetails />} />
              <Route path="/create-itinerary" element={<CreateItinerary />} />
              <Route path="/trip-itineraries" element={<Itineraries />} />
              <Route path="/trip-itineraries/:id" element={<ItineraryDetails />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/travel-groups" element={<TravelGroups />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
