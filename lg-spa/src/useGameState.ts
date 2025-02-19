import {createContext, useContext} from 'react';
import { GameRow } from './types';

type GameState = {
  selectedGame: GameRow | null
  setSelectedGame(sg: GameRow): void
}

export const GameContext = createContext<GameState>({
  selectedGame: null,
  setSelectedGame: (sg) => {}
})

export function useGameState() {
  return useContext(GameContext)
}