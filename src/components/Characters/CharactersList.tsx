// src/components/Characters/CharactersList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApiCharacterDetails } from '../../services/api';
import '../../styles/CharactersList.scss'; // Import the stylesheet

interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
    };
    image: string; // Character image URL
}

interface CharactersListProps {
    characterIds: string[];
}

const CharactersList: React.FC<CharactersListProps> = ({ characterIds }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            setIsLoading(true);
            try {
                // Fetch details for each resident
                const residentsData = await Promise.all(
                    characterIds.map((characterId: string) =>
                        fetchApiCharacterDetails(characterId.split('/').pop()!)
                    )
                );
                setCharacters(residentsData);
            } catch (error) {
                console.error('Error fetching characters:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (characterIds.length > 0) {
            fetchCharacters();
        }
    }, [characterIds]);

    return (
        <div className="residents-container">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {characters.map((character) => (
                        <div key={character.id} className="resident-card">
                            <img src={character.image} alt={`${character.name}'s image`} />
                            <div className="resident-details">
                                <h4>{character.name}</h4>
                                <p>Status: {character.status}</p>
                                <p>Species: {character.species}</p>
                                <p>Type: {character.type}</p>
                                <p>Gender: {character.gender}</p>
                                <p>Origin: {character.origin.name}</p>
                                <Link to={`/characters/${character.id}`}>View Details</Link>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default CharactersList;
