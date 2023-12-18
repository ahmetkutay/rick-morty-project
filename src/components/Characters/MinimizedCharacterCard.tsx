import React from 'react';
import '../../styles/MinimizedCharacterCard.scss';

interface MinimizedCharacterCardProps {
    character: {
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
    };
}

const MinimizedCharacterCard: React.FC<MinimizedCharacterCardProps> = ({ character }) => {
    return (
        <div className="minimized-character-card">
            <img src={character.image} alt={character.name} />
            <div className="card-details">
                <h4>{character.name}</h4>
                <p>{character.species} / {character.type}</p>
            </div>
        </div>
    );
};

export default MinimizedCharacterCard;
