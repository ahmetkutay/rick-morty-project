// src/services/api.ts
const BASE_URL = "https://rickandmortyapi.com/api";

export const fetchApiLocations = async (pageId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/location?page=${pageId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error; // Propagate the error to handle it in the component
  }
};

export const fetchApiLocationDetails = async (locationId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/location/${locationId}`);
    const data = await response.json();
    return data; // Return the location details
  } catch (error) {
    console.error("Error fetching location details:", error);
    throw error;
  }
};

export const fetchApiCharacters = async (locationId: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/character?location=${locationId}`
    );
    const data = await response.json();
    return data.results; // Assuming the API response has a 'results' property
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const fetchApiCharacterDetails = async (characterId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/character/${characterId}`);
    const data = await response.json();
    return data; // Return the character details
  } catch (error) {
    console.error("Error fetching character details:", error);
    throw error;
  }
};
