import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../../state/actions/favoriteCharactersActions';
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

    useEffect(() => {
        const fetchCharacters = async () => {
            setIsLoading(true);
            try {
                const residentsData = await Promise.all(
                    characterIds.map((characterId: string) =>
                        fetchApiCharacterDetails(characterId.split('/').pop()!)
                    )
                );

                const filteredCharacters = filter
                    ? residentsData.filter((character) => character.status.toLowerCase() === filter)
                    : residentsData;

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

    const handleAddToFavorites = (characterId: string) => {
        dispatch(addToFavorites(characterId));
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
                                <Link to={`/characters/${character.id}`}>View Details</Link>
                                <button onClick={() => handleAddToFavorites(character.id)}>Add to Favorites</button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default CharactersList;
