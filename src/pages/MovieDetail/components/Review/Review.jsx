import React, { useState } from 'react';
import './Review.style.css';

const Review = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const MAX_LENGTH = 250; // 기본적으로 보여줄 최대 글자 수

  return (
    <div>
      <div className="review-box">
        <div
          style={{
            fontSize: '1.3rem',
            fontWeight: 'bolder',
            marginBottom: '8px',
          }}
        >
          {review.author}
        </div>
        <div>
          {isExpanded
            ? review.content
            : review.content.substring(0, MAX_LENGTH) + '...'}
        </div>
        <button
          className=" expand-btn "
          onClick={toggleExpand}
          style={{ color: 'white' }}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
    </div>
  );
};

export default Review;
