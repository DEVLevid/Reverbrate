export interface SearchParams {
    query: string;
    type?: 'track' | 'artist' | 'album';
    limit?: number;
    offset?: number;
  }
  
  export interface Review {
    rate: number;
    comment: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface TrackWithReview {
    id: string;
    name: string;
    artist_name: string;
    cover: string;
    type: string;
    uri: string;
    review: Review | null;
  }
  
  export interface SearchResponse {
    tracks: {
      data: TrackWithReview[];
      limit?: number;
      next?: any;
      offset?: number;
      previous?: any;
      total?: number;
    };
  }