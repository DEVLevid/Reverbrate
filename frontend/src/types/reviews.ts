export interface ReviewCreatedBy {
  id: string;
  image: string;
  name: string;
  nickname: string;
}

export interface TrackInfo {
  id: string;
  uri: string;
  cover: string;
  name: string;
  artist: string;
  isrc_id: string;
  album_name: string;
  album_uri: string;
  artist_name: string;
  artist_uri: string;
  review: null | any;
}

export interface TrackReview {
  rate: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  rate: number;
  comment: string;
  created_at: string;
  updated_at: string;
  created_by: ReviewCreatedBy;
  track_info: TrackInfo;
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
