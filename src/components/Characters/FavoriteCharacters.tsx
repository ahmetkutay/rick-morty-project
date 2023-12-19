import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import Header from '../common/Header';
import CharactersList from './CharactersList';

const FavoriteCharacters: React.FC = () => {
    const favoriteCharacters = useSelector((state: RootState) => state.favoriteCharacters.favoriteCharacters);

    return (
        <>
            <Header />
            <div>
                {favoriteCharacters.length !== 0 ? (
                    <div>
                        <CharactersList characterIds={favoriteCharacters} />
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>No favorite characters yet!</div>
                )
                }
            </div>
        </>
    );
};

export default FavoriteCharacters;