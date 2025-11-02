import React from 'react';
import './Rating.css';

interface RatingProps {
  value: number;
  max?: number;
  readonly?: boolean;
  onChange?: (value: number) => void;
  showValue?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  readonly = false,
  onChange,
  showValue = true,
  size = 'medium',
}) => {
  const handleClick = (newValue: number) => {
    if (!readonly && onChange) {
      onChange(newValue);
    }
  };

  const sizeClass = `rating-${size}`;

  return (
    <div className={`rating ${sizeClass}`}>
      <div className="rating-stars">
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              className={`star ${starValue <= value ? 'filled' : 'empty'}`}
              onClick={() => handleClick(starValue)}
              style={{ cursor: readonly ? 'default' : 'pointer' }}
            >
              ★
            </span>
          );
        })}
      </div>
      {showValue && <span className="rating-value">{value.toFixed(1)}</span>}
    </div>
  );
};

export default Rating;
