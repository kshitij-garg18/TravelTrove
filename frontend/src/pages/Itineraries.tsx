import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllItineraries } from '../services/itineraryService';
import { TripItinerary } from '../types';
import Rating from '../components/Rating';
import './Itineraries.css';

const Itineraries: React.FC = () => {
  const [itineraries, setItineraries] = useState<TripItinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadItineraries();
  }, []);

  const loadItineraries = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllItineraries();
      setItineraries(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load itineraries');
      console.error('Error loading itineraries:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="itineraries-loading">Loading itineraries...</div>;
  }

  return (
    <div className="itineraries">
      <div className="itineraries-container">
        <div className="itineraries-header">
          <h1>Browse Trip Itineraries</h1>
          <Link to="/create-itinerary" className="create-button">
            + Create New Itinerary
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        {itineraries.length === 0 ? (
          <div className="no-itineraries">
            <p>No itineraries found. Be the first to create one!</p>
            <Link to="/create-itinerary" className="create-link">
              Create Your First Itinerary
            </Link>
          </div>
        ) : (
          <div className="itineraries-grid">
            {itineraries.map((itinerary) => (
              <div key={itinerary._id} className="itinerary-card">
                <Link to={`/trip-itineraries/${itinerary._id}`} className="itinerary-link">
                  <div className="itinerary-card-header">
                    <h2>{itinerary.destination}</h2>
                    <span className="duration-badge">{itinerary.duration} days</span>
                  </div>
                  
                  {itinerary.userId && (
                    <p className="itinerary-creator">
                      Created by: {itinerary.userId.email}
                    </p>
                  )}

                  {itinerary.ratings && (
                    <div className="itinerary-rating">
                      <Rating 
                        value={itinerary.ratings.average} 
                        readonly 
                        showValue 
                        size="small" 
                      />
                      <span className="review-count">
                        ({itinerary.ratings.count} reviews)
                      </span>
                    </div>
                  )}

                  <div className="itinerary-stats">
                    <div className="stat-item">
                      <span className="stat-label">Activities:</span>
                      <span className="stat-value">{itinerary.activities?.length || 0}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Lodging:</span>
                      <span className="stat-value">{itinerary.lodging?.length || 0}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Dining:</span>
                      <span className="stat-value">{itinerary.dining?.length || 0}</span>
                    </div>
                  </div>

                  {itinerary.createdAt && (
                    <p className="itinerary-date">
                      Created: {new Date(itinerary.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Itineraries;
