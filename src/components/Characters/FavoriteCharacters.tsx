import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../state/actions/favoriteCharactersActions';
import Pagination from '../common/Pagination';
import { RootState } from '../../state/store';
import Header from '../common/Header';

const CharactersList: React.FC = () => {
    const favoriteCharacters = useSelector((state: RootState) => state.favoriteCharacters.favoriteCharacters);
    const dispatch = useDispatch();

    const isFavorite = (characterId: string) => favoriteCharacters.some((favCharacterId) => favCharacterId === characterId);

    const handleToggleFavorite = (characterId: string) => {
        if (isFavorite(characterId)) {
            dispatch(removeFromFavorites(characterId));
        } else {
            dispatch(addToFavorites(characterId));
        }
    };

    return (
        <>
            <Header />
        <div>
            <h1>Characters</h1>
                {favoriteCharacters.map((favCharacterId) => (
                    <div key={favCharacterId}>
                        <Link to={`/characters/${favCharacterId}`}>
                            test - 1
                    </Link>
                        <button onClick={() => handleToggleFavorite(favCharacterId)}>
                            {isFavorite(favCharacterId) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            ))}
            <Pagination totalPages={0} currentPage={0} onPageChange={function (page: number): void {
                throw new Error('Function not implemented.');
            }} />
        </div>
        </>
    );
};

export default CharactersList;