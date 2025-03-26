import { createContext, useContext } from 'react';
import { User } from '../types';

type UserState = {
  user: User | null;
  setUser(su: User | null): void;
};

export const UserContext = createContext<UserState>({
  user: null,
  setUser: (su) => {
    localStorage.setItem('user', JSON.stringify(su));
  }
});

export function useUserState() {
  return useContext(UserContext);
}