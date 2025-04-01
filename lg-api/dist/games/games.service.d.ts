import { DatabaseService } from 'src/database/database.service';
export declare class GamesService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findByAuthorAndId(author: string, gameString: string): Promise<any>;
    findAll(): Promise<{
        genre: {
            id: number;
            name: string;
        };
        id: number;
        game_string: string;
        author: {
            id: number;
            username: string;
            developer: boolean | null;
            image: string | null;
            email: string;
            is_verified: boolean;
            verification_token: string | null;
            created_at: Date | null;
            updated_at: Date | null;
        };
        tags: {
            id: number;
            name: string;
        }[];
        assets: {
            type: string;
            path: string;
        }[];
        achievements: {
            id: number;
            game_id: number;
            difficulty: string;
            icon_path: string;
        }[];
        favorites: {
            game_id: number;
            user_id: number;
        }[];
        ratings: {
            game_id: number;
            user_id: number;
            value: number;
        }[];
        translations: {
            name: string;
            description: string;
        }[];
        plays: {
            id: number;
            game_id: number;
            count: number;
            date: Date | null;
        }[];
    }[]>;
    findPopular(): Promise<{
        genre: {
            id: number;
            name: string;
        };
        game_string: string;
        author: {
            id: number;
            username: string;
            developer: boolean | null;
            image: string | null;
            email: string;
            is_verified: boolean;
            verification_token: string | null;
            created_at: Date | null;
            updated_at: Date | null;
        };
        tags: {
            id: number;
            name: string;
        }[];
        assets: {
            type: string;
            path: string;
        }[];
        achievements: {
            id: number;
            game_id: number;
            difficulty: string;
            icon_path: string;
        }[];
        favorites: {
            game_id: number;
            user_id: number;
        }[];
        ratings: {
            game_id: number;
            user_id: number;
            value: number;
        }[];
        translations: {
            name: string;
            description: string;
        }[];
        plays: {
            id: number;
            game_id: number;
            count: number;
            date: Date | null;
        }[];
    }[]>;
    findByGenre(genre: string): Promise<{
        genre: {
            id: number;
            name: string;
        };
        game_string: string;
        author: {
            id: number;
            username: string;
            developer: boolean | null;
            image: string | null;
            email: string;
            is_verified: boolean;
            verification_token: string | null;
            created_at: Date | null;
            updated_at: Date | null;
        };
        tags: {
            id: number;
            name: string;
        }[];
        assets: {
            type: string;
            path: string;
        }[];
        achievements: {
            id: number;
            game_id: number;
            difficulty: string;
            icon_path: string;
        }[];
        favorites: {
            game_id: number;
            user_id: number;
        }[];
        ratings: {
            game_id: number;
            user_id: number;
            value: number;
        }[];
        translations: {
            name: string;
            description: string;
        }[];
        plays: {
            id: number;
            game_id: number;
            count: number;
            date: Date | null;
        }[];
    }[]>;
    findOne(id: number): Promise<{
        genre: {
            name: string;
        };
        author: {
            username: string;
            image: string;
        };
        tags: {
            name: string;
        }[];
    } & {
        id: number;
        game_string: string;
        iframe: string;
        width: number;
        height: number;
        author_id: number | null;
        genre_id: number;
    }>;
    transpose(game: any): any;
    transposeAll(games: any[]): unknown[];
}
