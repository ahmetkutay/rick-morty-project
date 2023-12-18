import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApiLocations } from '../../services/api';
import Pagination from '../common/Pagination';
import '../../styles/LocationsList.scss';

interface Location {
    id: string;
    name: string;
    type: string;
    dimension: string;
    residents: [];
}

const LocationsList: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [locationsInfo, setLocationsInfo] = useState<any>();

    const fetchLocations = async (pageId: number) => {
        try {
            const data = await fetchApiLocations(pageId);
            setLocationsInfo(data.info);
            setLocations(data.results);
        } catch (error) {
            console.error('Error fetching locations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations(1);
    }, []);

    return (
        <div className="locations-container">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="locations-columns">
                        {locations.map((location, index) => (
                            <div key={location.id} className={`location-item ${index % 2 === 0 ? 'left-column' : 'right-column'}`}>
                                <Link to={`/locations/${location.id}`}>
                                    <div>
                                        <strong>Name:</strong> {location.name}<br />
                                        <strong>Type:</strong> {location.type}<br />
                                        <strong>Dimension:</strong> {location.dimension === "unknown" ? "-" : location.dimension}<br />
                                        <strong>Resident Count:</strong> {location.residents.length}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Pagination totalPages={locationsInfo.pages} currentPage={1} onPageChange={(page) => fetchLocations(page)} />
                </>
            )}
        </div>
    );
};

export default LocationsList;
