export interface TrackInfo {
  id: string;
  cover: string;
  isrc_id: string;
  name: string;
  artist: string;
}

export interface Review {
  rate: number;
  comment: string;
}

export interface Comment {
  id: string;
  track_info: TrackInfo;
  review: Review;
}

export interface CommentsResponse {
  data: Comment[];
  limit: number;
  offset: number;
  total: number;
}

export interface CreateCommentRequest {
  track_id: string;
  rate: number;
  comment: string;
}

export interface UpdateCommentRequest {
  rate?: number;
  comment?: string;
}

export interface CommentListRequest {
  limit?: number;
  offset?: number;
}

export interface CommentByTrackRequest {
  trackId: string;
  limit?: number;
  offset?: number;
}
