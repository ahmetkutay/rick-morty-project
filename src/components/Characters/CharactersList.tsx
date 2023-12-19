import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../state/actions/favoriteCharactersActions';
import { RootState } from '../../state/store';
import { fetchApiCharacterDetails } from '../../services/api';
import '../../styles/CharactersList.scss';

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
    image: string;
}

interface CharactersListProps {
    characterIds: string[];
    filter?: string | null;
}

const CharactersList: React.FC<CharactersListProps> = ({ characterIds, filter }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const favoriteCharacters = useSelector((state: RootState) => state.favoriteCharacters.favoriteCharacters);

    useEffect(() => {
        const fetchCharacters = async () => {
            setIsLoading(true);
            try {
                const residentsData = await Promise.all(
                    characterIds.map(async (characterId: string) => {
                        try {
                            const idToFetch = typeof characterId === 'string' && characterId.includes('/') ? characterId.split('/').pop()! : characterId;
                            return await fetchApiCharacterDetails(idToFetch);
                        } catch (error) {
                            console.error(`Error fetching character with ID ${characterId}:`, error);
                            return null;
                        }
                    })
                );

                const filteredCharacters = filter
                    ? residentsData.filter((character) => character && character.status.toLowerCase() === filter)
                    : residentsData.filter(Boolean);

                localStorage.setItem('characters', JSON.stringify(filteredCharacters));
                setCharacters(filteredCharacters);
            } catch (error) {
                console.error('Error fetching characters:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (characterIds.length > 0) {
            fetchCharacters();
        }
    }, [characterIds, filter]);

    const isFavorite = (characterId: string) => favoriteCharacters.includes(characterId);

    const handleAddToFavorites = (characterId: string) => {
        if (!isFavorite(characterId)) {
            dispatch(addToFavorites(characterId));
        } else {
            dispatch(removeFromFavorites(characterId));
        }
    };

    return (
        <div className="residents-container">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {characters.map((character) => (
                        <div key={character.id} className="resident-card">
                            <img src={character.image} alt={character.name} />
                            <div className="resident-details">
                                <h4>{character.name}</h4>
                                <p>Status: {character.status}</p>
                                <p>Species: {character.species}</p>
                                <p>Type: {character.type === undefined ? "-" : character.type}</p>
                                <p>Gender: {character.gender}</p>
                                <p>Origin: {character.origin.name === "unknown" ? "-" : character.origin.name}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Link to={`/characters/${character.id}`}>View Details</Link>
                                    {isFavorite(character.id) ? (
                                        <button onClick={() => handleAddToFavorites(character.id)}>Remove from Favorites</button>
                                    ) : (
                                        <button onClick={() => handleAddToFavorites(character.id)}>Add to Favorites</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default CharactersList;
