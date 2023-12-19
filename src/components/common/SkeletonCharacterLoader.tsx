import React from 'react';
import '../../styles/SkeletonCharacterLoader.scss';

const SkeletonCharacterLoader: React.FC = () => {
  const skeletonCards = new Array(3).fill({}); // Change 10 to the number of skeleton cards you want to render

  return (
    <div className="skeleton-container">
      {skeletonCards.map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-details">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-link"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCharacterLoader;