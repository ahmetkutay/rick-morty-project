// src/components/Locations/LocationDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CharactersList from '../Characters/CharactersList';
import { fetchApiLocationDetails } from '../../services/api';

interface LocationDetail {
    id: string;
    name: string;
    type: string;
    dimension: string;
    residents: string[]; // Array of resident URLs
}

const LocationDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [locationDetails, setLocationDetails] = useState<LocationDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLocationDetails = async () => {
            setIsLoading(true);
            try {
                // Ensure id is defined before calling the API
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

    return (
        <div>
            {isLoading || !locationDetails ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <CharactersList characterIds={locationDetails.residents} />
                </div>
            )}
        </div>
    );
};

export default LocationDetails;
