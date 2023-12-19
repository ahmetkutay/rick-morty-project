import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../actions/favoriteCharactersActions";

interface FavoriteCharactersState {
  favoriteCharacters: string[];
}

const initialState: FavoriteCharactersState = {
  favoriteCharacters: [],
};

const favoriteCharactersReducer = (
  state = initialState,
  action: any
): FavoriteCharactersState => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteCharacters: [...state.favoriteCharacters, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteCharacters: state.favoriteCharacters.filter(
          (characterId) => characterId !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default favoriteCharactersReducer;
