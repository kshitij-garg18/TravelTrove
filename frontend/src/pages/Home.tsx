import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import DestinationCard from '../components/DestinationCard';
import { useAuth } from '../context/AuthContext';
import { searchDestinations } from '../services/destinationService';
import { addFavourite } from '../services/favouriteService';
import { DestinationGuide, SearchParams } from '../types';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [destinations, setDestinations] = useState<DestinationGuide[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'reviews'>('relevance');

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async (query: string = '') => {
    setLoading(true);
    setError('');
    try {
      const params: SearchParams = {
        query,
        sortBy,
      };
      const results = await searchDestinations(params);
      setDestinations(results);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load destinations');
      console.error('Error loading destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    loadDestinations(query);
  };

  const handleSortChange = (newSortBy: 'relevance' | 'rating' | 'reviews') => {
    setSortBy(newSortBy);
    loadDestinations(searchQuery);
  };

  const handleAddToFavourite = async (destinationId: string) => {
    if (!isAuthenticated()) {
      setError('Please login to save favourites');
      setTimeout(() => setError(''), 3000);
      navigate('/login');
      return;
    }

    try {
      await addFavourite(destinationId);
      alert('Added to favourites!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to add favourite';
      setError(errorMessage);
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Discover Your Next Adventure</h1>
        <p>Search for amazing destinations and plan your perfect trip</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="home-content">
        {error && <div className="error-message">{error}</div>}

        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}>
            <option value="relevance">Relevance</option>
            <option value="rating">Rating</option>
            <option value="reviews">Reviews</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading destinations...</div>
        ) : destinations.length > 0 ? (
          <div className="destinations-grid">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
                onAddToFavourite={handleAddToFavourite}
                showFavouriteButton={true}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No destinations found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
