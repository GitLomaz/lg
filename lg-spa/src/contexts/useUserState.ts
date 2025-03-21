import {createContext, useContext} from 'react';
import { User } from '../types';

type UserState = {
  user: User | null
  setUser(su: User): void
}

export const UserContext = createContext<UserState>({
  user: null,
  setUser: (su) => {}
})

export function useUserState() {
  return useContext(UserContext)
}