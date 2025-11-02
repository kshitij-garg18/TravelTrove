import React from 'react';
import { Review } from '../types';
import Rating from './Rating';
import './ReviewCard.css';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <span className="reviewer-email">{review.userId.email}</span>
          <span className="review-date">{formatDate(review.createdAt)}</span>
        </div>
        <Rating value={review.rating} readonly size="small" />
      </div>
      <p className="review-comment">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
