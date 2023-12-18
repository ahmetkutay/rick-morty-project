import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../actions/favoriteCharactersActions";

interface Character {
  id: string;
  name: string;
  status: string;
}

interface FavoriteCharactersState {
  favoriteCharacters: Character[];
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
          (character) => character.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default favoriteCharactersReducer;
