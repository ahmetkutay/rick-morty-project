import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import favoriteCharactersReducer from "./reducers/favoriteCharactersReducer";

export const store = configureStore({
  reducer: {
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
