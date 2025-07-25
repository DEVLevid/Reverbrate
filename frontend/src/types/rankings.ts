
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

export interface RankingTrackInfo {
    id: string;
    cover: string;
    name: string;
    artist: string;
    review: string | null;
}

export interface RankingCreatedBy {
    id: string;
    name: string;
    image: string;
}

export interface RankingNetwork {
    rate: number;
    comment: string;
    created_at: string;
    updated_at: string;
    track_info: RankingTrackInfo;
    created_by: RankingCreatedBy;
}

export interface RankingTrack {
    rate: number;
    comment: string;
    created_at: string;
    updated_at: string;
    track_info: RankingTrackInfo;
    created_by: RankingCreatedBy;
    network: RankingNetwork[];
}

export interface RankingTracksResponse {
    data: RankingTrack[];
    total: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
}