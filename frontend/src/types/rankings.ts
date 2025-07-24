
export interface UserRanking {
    id: string;
    name: string;
    image: string;
    followers_count: number;
    reviews_count: number;
    lists_count: number;
}

export interface RankingsResponse {
    data: UserRanking[];
    total: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
}