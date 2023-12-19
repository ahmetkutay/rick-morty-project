export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

export const addToFavorites = (characterId: any) => ({
  type: ADD_TO_FAVORITES,
  payload: characterId,
});

export const removeFromFavorites = (characterId: string) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: characterId,
});
