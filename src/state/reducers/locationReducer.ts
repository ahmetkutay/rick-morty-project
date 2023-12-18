// src/state/reducers/locationReducer.ts
import { SET_LOCATIONS } from "../actions/locationActions";

const initialState = {
  locations: [],
};

const locationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
