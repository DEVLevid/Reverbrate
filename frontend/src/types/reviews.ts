export interface TrackInfo {
    id: string;
    cover: string;
    isrc_id: string;
    name: string;
    artist: string;
}

export interface Review {
    id: string;
    track_info: TrackInfo;
    rate: number;
    comment: string;
    created_at: string;
    updated_at: string;
}

export interface ReviewsResponse {
    data: Review[];
    limit: number;
    next?: boolean;
    previous?: boolean;
    offset: number;
    total: number;
}

export interface CreateReviewRequest {
    track_id: string;
    review: {
        rate: number;
        comment: string;
    };
}

export interface UpdateReviewRequest {
    rate?: number;
    comment?: string;
}

export interface ReviewListRequest {
    limit?: number;
    offset?: number;
}

export interface ReviewByTrackRequest {
    trackId: string;
    limit?: number;
    offset?: number;
}
