import {createContext, useContext} from 'react';
import { GameRow } from '../types';

type GameState = {
  activeGame: GameRow | null
  setActiveGame(sg: GameRow): void
}

export const GameContext = createContext<GameState>({
  activeGame: null,
  setActiveGame: (sg) => {}
})

export function useGameState() {
  return useContext(GameContext)
}