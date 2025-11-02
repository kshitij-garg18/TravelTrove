import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFavourites, deleteFavourite } from '../services/favouriteService';
import { Favourite } from '../types';
import DestinationCard from '../components/DestinationCard';
import { Link } from 'react-router-dom';
import './Favourites.css';

const Favourites: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadFavourites();
  }, [isAuthenticated, navigate]);

  const loadFavourites = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getFavourites();
      console.log('Favourites loaded:', data); // Debug log
      setFavourites(data || []);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to load favourites';
      setError(errorMsg);
      console.error('Error loading favourites:', err);
      console.error('Error response:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFavourite = async (favouriteId: string) => {
    try {
      await deleteFavourite(favouriteId);
      setFavourites(favourites.filter((fav) => fav._id !== favouriteId));
      alert('Removed from favourites!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to remove favourite';
      setError(errorMessage);
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return <div className="favourites-loading">Loading favourites...</div>;
  }

  return (
    <div className="favourites">
      <div className="favourites-container">
        <h1>My Favourites</h1>
        {error && <div className="error-message">{error}</div>}

        {favourites.length === 0 && !loading ? (
          <div className="no-favourites">
            <p>You haven't saved any favourites yet.</p>
            <Link to="/">Browse destinations</Link>
          </div>
        ) : (
          <div className="favourites-grid">
            {favourites.map((favourite) => {
              // Handle both naming conventions (destinationGuide vs destinationGuideId after population)
              const destinationGuide = favourite.destinationGuide || favourite.destinationGuideId;
              const tripItinerary = favourite.tripItinerary || favourite.tripItineraryId;
              
              return (
                <div key={favourite._id} className="favourite-item">
                  {destinationGuide && typeof destinationGuide === 'object' && (
                    <>
                      <DestinationCard
                        destination={destinationGuide}
                        showFavouriteButton={false}
                      />
                      <button
                        onClick={() => handleDeleteFavourite(favourite._id)}
                        className="remove-favourite-button"
                      >
                        Remove from Favourites
                      </button>
                    </>
                  )}
                  {tripItinerary && typeof tripItinerary === 'object' && (
                    <div className="itinerary-favourite-card">
                      <Link to={`/trip-itineraries/${tripItinerary._id}`}>
                        <h3>{tripItinerary.destination} Itinerary</h3>
                        <p>Duration: {tripItinerary.duration} days</p>
                        {tripItinerary.ratings && (
                          <p>Rating: {tripItinerary.ratings.average.toFixed(1)} ⭐</p>
                        )}
                      </Link>
                      <button
                        onClick={() => handleDeleteFavourite(favourite._id)}
                        className="remove-favourite-button"
                      >
                        Remove from Favourites
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
