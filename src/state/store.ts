import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import locationReducer from "./reducers/locationReducer";
import characterReducer from "./reducers/characterReducer";
import favoriteCharactersReducer from "./reducers/favoriteCharactersReducer";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    character: characterReducer,
    favoriteCharacters: favoriteCharactersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
