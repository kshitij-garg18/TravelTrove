import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getItineraryById } from '../services/itineraryService';
import { addFavourite } from '../services/favouriteService';
import { TripItinerary } from '../types';
import Rating from '../components/Rating';
import ReviewCard from '../components/ReviewCard';
import './ItineraryDetails.css';

const ItineraryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');

  useEffect(() => {
    if (id) {
      loadItinerary();
    }
  }, [id]);

  const loadItinerary = async () => {
    if (!id) return;

    setLoading(true);
    setError('');
    try {
      const data = await getItineraryById(id);
      setItinerary(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load itinerary');
      console.error('Error loading itinerary:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavourite = async () => {
    if (!isAuthenticated()) {
      setError('Please login to save favourites');
      setTimeout(() => setError(''), 3000);
      navigate('/login');
      return;
    }

    if (!id) return;

    try {
      await addFavourite(undefined, id);
      alert('Added to favourites!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to add favourite';
      setError(errorMessage);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated()) {
      setError('Please login to submit reviews');
      setTimeout(() => setError(''), 3000);
      navigate('/login');
      return;
    }

    // TODO: Implement review submission when backend endpoint is available
    alert('Review submission feature coming soon!');
  };

  if (loading) {
    return <div className="itinerary-details-loading">Loading itinerary...</div>;
  }

  if (error && !itinerary) {
    return <div className="itinerary-details-error">{error}</div>;
  }

  if (!itinerary) {
    return <div className="itinerary-details-error">Itinerary not found</div>;
  }

  return (
    <div className="itinerary-details">
      {error && <div className="error-message">{error}</div>}

      <div className="itinerary-header">
        <div className="itinerary-info">
          <h1>{itinerary.destination} Itinerary</h1>
          <p className="duration">Duration: {itinerary.duration} day{itinerary.duration > 1 ? 's' : ''}</p>
          {itinerary.userId && (
            <p className="creator">Created by: {itinerary.userId.email}</p>
          )}
          {itinerary.ratings && (
            <div className="rating-section">
              <Rating value={itinerary.ratings.average} readonly showValue size="large" />
              <span className="rating-count">({itinerary.ratings.count} reviews)</span>
            </div>
          )}
          <button onClick={handleAddToFavourite} className="favourite-button">
            ♥ Add to Favourites
          </button>
        </div>
      </div>

      <div className="itinerary-content">
        {itinerary.activities && itinerary.activities.length > 0 && (
          <div className="content-section">
            <h2>Activities</h2>
            <div className="activities-list">
              {itinerary.activities.map((activity, index) => (
                <div key={index} className="activity-card">
                  <h3>{activity.name}</h3>
                  <p>{activity.description}</p>
                  {(activity.date || activity.time) && (
                    <p className="activity-time">
                      {activity.date && <span>Date: {activity.date}</span>}
                      {activity.time && <span>Time: {activity.time}</span>}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {itinerary.lodging && itinerary.lodging.length > 0 && (
          <div className="content-section">
            <h2>Lodging Recommendations</h2>
            <div className="recommendations-grid">
              {itinerary.lodging.map((lodging, index) => (
                <div key={index} className="recommendation-card">
                  <h3>{lodging.name}</h3>
                  <p className="type">{lodging.type}</p>
                  <p>{lodging.description}</p>
                  {lodging.priceRange && <p className="price">Price: {lodging.priceRange}</p>}
                  {lodging.address && <p className="address">{lodging.address}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {itinerary.dining && itinerary.dining.length > 0 && (
          <div className="content-section">
            <h2>Dining Recommendations</h2>
            <div className="recommendations-grid">
              {itinerary.dining.map((dining, index) => (
                <div key={index} className="recommendation-card">
                  <h3>{dining.name}</h3>
                  <p className="type">Cuisine: {dining.cuisine}</p>
                  <p>{dining.description}</p>
                  {dining.priceRange && <p className="price">Price: {dining.priceRange}</p>}
                  {dining.address && <p className="address">{dining.address}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="content-section">
          <h2>Reviews</h2>
          {itinerary.reviews && itinerary.reviews.length > 0 ? (
            <div className="reviews-list">
              {itinerary.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}

          {isAuthenticated() && (
            <div className="add-review">
              <h3>Write a Review</h3>
              <div className="review-form">
                <div className="rating-input">
                  <label>Rating:</label>
                  <Rating value={reviewRating} onChange={setReviewRating} />
                </div>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write your review here..."
                  rows={5}
                  className="review-textarea"
                />
                <button onClick={handleSubmitReview} className="submit-review-button">
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
