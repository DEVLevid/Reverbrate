export interface TrackInfo {
  id: string;
  cover: string;
  isrc_id: string;
  name: string;
  artist: string;
}

export interface TrackReview {
  rate: number;
  comment: string;
}

export interface Review {
  id: string;
  track_info: TrackInfo;
  review: TrackReview;
}

export interface ReviewsResponse {
  data: Review[];
  limit: number;
  offset: number;
  total: number;
}

export interface CreateReviewRequest {
  track_id: string;
  rate: number;
  comment: string;
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
