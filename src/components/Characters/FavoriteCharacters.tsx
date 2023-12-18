import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useCharacters from '../../hooks/useCharacters';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../state/actions/favoriteCharactersActions';
import Pagination from '../common/Pagination';
import { RootState } from '../../state/store';

interface Character {
    id: string;
    name: string;
    status: string;
}

const CharactersList: React.FC = () => {
    const { id: locationId } = useParams<{ id: string }>();
    const { characters, isLoading } = useCharacters(locationId || "");
    const favoriteCharacters = useSelector((state: RootState) => state.favoriteCharacters.favoriteCharacters);
    const dispatch = useDispatch();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const isFavorite = (characterId: string) => favoriteCharacters.some((character: Character) => character.id === characterId);

    const handleToggleFavorite = (character: Character) => {
        if (isFavorite(character.id)) {
            dispatch(removeFromFavorites(character.id));
        } else {
            dispatch(addToFavorites(character));
        }
    };

    return (
        <div>
            <h1>Characters</h1>
            {characters.map((character: Character) => (
                <div key={character.id}>
                    <Link to={`/characters/${character.id}`}>
                        {character.name} - {character.status}
                    </Link>
                    <button onClick={() => handleToggleFavorite(character)}>
                        {isFavorite(character.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            ))}
            <Pagination totalPages={0} currentPage={0} onPageChange={function (page: number): void {
                throw new Error('Function not implemented.');
            }} />
        </div>
    );
};

export default CharactersList;