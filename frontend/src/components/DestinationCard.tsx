import React from 'react';
import { Link } from 'react-router-dom';
import { DestinationGuide } from '../types';
import './DestinationCard.css';

interface DestinationCardProps {
  destination: DestinationGuide;
  onAddToFavourite?: (destinationId: string) => void;
  showFavouriteButton?: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onAddToFavourite,
  showFavouriteButton = true,
}) => {
  return (
    <div className="destination-card">
      <Link to={`/destination-guides/${destination._id}`} className="destination-link">
        <div className="destination-image-container">
          <img
            src={destination.photos?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
            alt={destination.title}
            className="destination-image"
          />
        </div>
        <div className="destination-content">
          <h3 className="destination-title">{destination.title}</h3>
          <p className="destination-summary">{destination.summary}</p>
          {destination.ratings && destination.ratings.average != null && (
            <div className="destination-rating">
              <span className="rating-stars">★</span>
              <span className="rating-value">{destination.ratings.average.toFixed(1)}</span>
              <span className="rating-count">({destination.ratings.count} reviews)</span>
            </div>
          )}
        </div>
      </Link>
      {showFavouriteButton && onAddToFavourite && (
        <button
          className="favourite-button"
          onClick={(e) => {
            e.preventDefault();
            onAddToFavourite(destination._id);
          }}
        >
          ♥ Add to Favourites
        </button>
      )}
    </div>
  );
};

export default DestinationCard;
