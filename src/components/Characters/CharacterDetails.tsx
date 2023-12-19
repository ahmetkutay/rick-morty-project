import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApiCharacterDetails } from '../../services/api';
import '../../styles/CharacterDetails.scss';
import MinimizedCharacterCard from './MinimizedCharacterCard';
import Header from '../common/Header';

interface CharacterDetailsType {
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

const CharacterDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [characterDetails, setCharacterDetails] = useState<CharacterDetailsType | null>(null);
    const [characters, setCharacters] = useState<CharacterDetailsType[]>([]); // Add this line
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                if (id) {
                    const response = await fetchApiCharacterDetails(id);
                    setCharacterDetails(response);
                }
            } catch (error) {
                console.error('Error fetching character details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const savedCharactersString = localStorage.getItem('characters');
        if (savedCharactersString) {
            const savedCharacters = JSON.parse(savedCharactersString);
            setCharacters(savedCharacters);
        }

        fetchCharacterDetails();
    }, [id]);

    return (
        <>
            <Header />
        <div className="split-layout">
            <div className="left-section card">
                {isLoading ? (
                    <div>Loading...</div>
                ) : characterDetails ? (
                    <div>
                            <img src={characterDetails.image} alt={characterDetails.name} />
                        <h2>{characterDetails.name}</h2>
                        <p>Status: {characterDetails.status}</p>
                        <p>Species: {characterDetails.species}</p>
                        <p>Type: {characterDetails.type}</p>
                    </div>
                ) : (
                    <div>No character details found</div>
                )}
            </div>
            <div className="right-section">
                <h1>Other Characters</h1>
                <div className="minimized-characters-list">
                    {characters.map((character) => (
                        <MinimizedCharacterCard key={character.id} character={character} />
                    ))}
                </div>
            </div>
        </div>
        </>

    );
};

export default CharacterDetails;
