// src/hooks/useCharacters.ts
import { useEffect, useState } from "react";
import { fetchApiCharacters } from "../services/api";

const useCharacters = (locationId: string) => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharactersData = async () => {
      try {
        const data = await fetchApiCharacters(locationId);
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharactersData();
  }, [locationId]);

  return { characters, isLoading };
};

export default useCharacters;
