// src/state/actions/favoriteCharactersActions.ts
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

export const addToFavorites = (character: any) => ({
  type: ADD_TO_FAVORITES,
  payload: character,
});

export const removeFromFavorites = (characterId: string) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: characterId,
});
