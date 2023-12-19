import React from 'react';
import '../../styles/SkeletonLocationLoader.scss';

const SkeletonLocationLoader: React.FC = () => {
    const skeletonItems = new Array(6).fill({}); // Change 10 to the number of skeleton items you want to render

    return (
        <div className="skeleton-location-loader">
            {skeletonItems.map((_, index) => (
                <div key={index} className="skeleton-location-item"></div>
            ))}
        </div>
    );
};

export default SkeletonLocationLoader;