import { SET_CHARACTERS } from "../actions/characterActions";

const initialState = {
  characters: [],
};

const characterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };
    default:
      return state;
  }
};

export default characterReducer;
