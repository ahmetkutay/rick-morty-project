// src/components/Characters/CharacterDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApiCharacterDetails } from '../../services/api';

interface CharacterDetailsType {
    name: string;
    status: string;
    species: string;
    type: string;
}

const CharacterDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [characterDetails, setCharacterDetails] = useState<CharacterDetailsType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCharacterDetails = async (id: string) => {
            try {
                const response = await fetchApiCharacterDetails(id);
                const data = await response.json();
                setCharacterDetails(data);
            } catch (error) {
                console.error('Error fetching character details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacterDetails(id!);
    }, [id]);

    return (
        <div>
            <h1>Character Details</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : characterDetails ? (
                <div>
                    <h2>{characterDetails.name}</h2>
                    <p>Status: {characterDetails.status}</p>
                    <p>Species: {characterDetails.species}</p>
                    <p>Type: {characterDetails.type}</p>
                </div>
            ) : (
                <div>No character details found</div>
            )}
        </div>
    );
};

export default CharacterDetails;