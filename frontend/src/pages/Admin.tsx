import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { searchDestinations } from '../services/destinationService';
import { getAllItineraries, deleteItinerary } from '../services/itineraryService';
import { DestinationGuide, TripItinerary } from '../types';
import './Admin.css';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [destinations, setDestinations] = useState<DestinationGuide[]>([]);
  const [itineraries, setItineraries] = useState<TripItinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'destinations' | 'itineraries'>('destinations');

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      navigate('/');
      return;
    }
    loadDestinations();
    loadItineraries();
  }, [isAuthenticated, isAdmin, navigate]);

  const loadDestinations = async () => {
    setError('');
    try {
      const data = await searchDestinations();
      setDestinations(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load destinations');
      console.error('Error loading destinations:', err);
    }
  };

  const loadItineraries = async () => {
    setError('');
    try {
      const data = await getAllItineraries();
      setItineraries(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load itineraries');
      console.error('Error loading itineraries:', err);
      setLoading(false);
    }
  };

  const handleDeleteDestination = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this destination?')) {
      return;
    }

    try {
      // TODO: Implement when backend endpoint is available
      // await deleteDestination(id);
      // loadDestinations();
      alert('Delete destination feature coming soon!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete destination');
    }
  };

  const handleDeleteItinerary = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this itinerary?')) {
      return;
    }

    try {
      await deleteItinerary(id);
      setItineraries(itineraries.filter((itinerary) => itinerary._id !== id));
      alert('Itinerary deleted successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete itinerary');
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin">
      <div className="admin-container">
        <h1>Admin Panel</h1>
        {error && <div className="error-message">{error}</div>}

        <div className="admin-tabs">
          <button
            className={activeTab === 'destinations' ? 'active' : ''}
            onClick={() => setActiveTab('destinations')}
          >
            Destination Guides
          </button>
          <button
            className={activeTab === 'itineraries' ? 'active' : ''}
            onClick={() => setActiveTab('itineraries')}
          >
            Trip Itineraries
          </button>
        </div>

        {activeTab === 'destinations' && (
          <div className="admin-content">
            <div className="admin-header">
              <h2>Manage Destination Guides</h2>
              <button className="add-button">+ Add Destination</button>
            </div>
            {destinations.length === 0 ? (
              <p>No destinations found.</p>
            ) : (
              <div className="admin-list">
                {destinations.map((destination) => (
                  <div key={destination._id} className="admin-item">
                    <div className="admin-item-info">
                      <h3>{destination.title}</h3>
                      <p>{destination.summary}</p>
                    </div>
                    <div className="admin-item-actions">
                      <button className="edit-button">Edit</button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteDestination(destination._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'itineraries' && (
          <div className="admin-content">
            <div className="admin-header">
              <h2>Manage Trip Itineraries</h2>
            </div>
            {itineraries.length === 0 ? (
              <p>No itineraries found.</p>
            ) : (
              <div className="admin-list">
                {itineraries.map((itinerary) => (
                  <div key={itinerary._id} className="admin-item">
                    <div className="admin-item-info">
                      <h3>{itinerary.destination} Itinerary</h3>
                      <p>Duration: {itinerary.duration} days | Activities: {itinerary.activities?.length || 0} | Created by: {itinerary.userId?.email || 'Unknown'}</p>
                      {itinerary.createdAt && (
                        <p className="admin-item-date">
                          Created: {new Date(itinerary.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="admin-item-actions">
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteItinerary(itinerary._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
