export interface Game {
  id: number,
  game_string: string,
  author: string,
  iframe: string,
  width: number,
  height: number,
  tags: string[];
  genre: string;
  ratings: {
    [key: string]: number;
    average: number;
  };
  plays: number;
  favorites: number;
  achievements: Achievement[];
  translations: Translation[];
  tile: string;
  screenshots: string[];
}

export interface GameRow extends Game {
  key?: string;
}

export interface Achievement {
  id: number;
  game_id: number;
  difficulty: string;
  icon_path: string;
}

export interface Translation {
  name: string;
  description: string;
}

export interface User {
  username: string;
  avatarUrl?: string;
};