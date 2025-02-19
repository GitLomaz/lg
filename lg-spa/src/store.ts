import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameRow } from './types';

// Define the type for the selectedGame state
interface SelectedGameState {
  game: GameRow | null;
}

// Initial state
const initialState: SelectedGameState = { game: null };

// Create a slice (reducers + actions in one)
const selectedGameSlice = createSlice({
  name: 'selectedGame',
  initialState,
  reducers: {
    setSelectedGame: (state, action: PayloadAction<GameRow>) => {
      state.game = action.payload;
    }
  }
});

// Export actions
export const { setSelectedGame } = selectedGameSlice.actions;

// Create the store
export const store = configureStore({
  reducer: { selectedGame: selectedGameSlice.reducer }
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;