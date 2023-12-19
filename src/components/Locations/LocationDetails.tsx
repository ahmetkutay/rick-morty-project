import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CharactersList from '../Characters/CharactersList';
import { fetchApiLocationDetails } from '../../services/api';
import Header from '../common/Header';
import SkeletonCharacterLoader from '../common/SkeletonCharacterLoader';

interface LocationDetail {
    id: string;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
}

const LocationDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [locationDetails, setLocationDetails] = useState<LocationDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocationDetails = async () => {
            setIsLoading(true);
            try {
                if (id) {
                    const data = await fetchApiLocationDetails(id);
                    setLocationDetails(data);
                }
            } catch (error) {
                console.error('Error fetching location details:', error);
            } finally {
                setIsLoading(false);
            }
        };


        fetchLocationDetails();
    }, [id]);

    const handleFilterChange = (selectedFilter: string | null) => {
        setFilter(selectedFilter);
    };

    return (
        <div>
            <Header />
            <div className='wrapper-section'>
                <div className="filter-section">
                    <div>
                        <h3>Filters by status</h3>
                    </div>
                    <div>
                        <button onClick={() => handleFilterChange('dead')}>Dead</button>
                        <button onClick={() => handleFilterChange('alive')}>Alive</button>
                        <button onClick={() => handleFilterChange('unknown')}>Unknown</button>
                    </div>
                </div>
                <div className="favorites-section">
                    <Link to="/favorites">
                        <button>My Favorites</button>
                    </Link>
                </div>
            </div>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <SkeletonCharacterLoader />
                </div>
            ) : !locationDetails || locationDetails.residents.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>No Character Found</div>
            ) : (
                <div>
                            <CharactersList characterIds={locationDetails.residents} filter={filter} />
                </div>
            )}
        </div>
    );
};

export default LocationDetails;
