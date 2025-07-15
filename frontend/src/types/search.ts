export interface SearchParams {
    query: string;
    type?: 'track' | 'artist' | 'album';
    limit?: number;
    offset?: number;
  }
  
  export interface Review {
    rate: number;
    comment: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface TrackWithReview {
    id: string;
    uri: string;
    type: 'track';
    name: string;
    artist_name: string;
    cover: string;
    review: Review | null;
  }
  
  export interface ArtistItem {
    id: string;
    uri: string;
    type: 'artist';
    name: string;
    cover: string;
  }
  
  export interface AlbumItem {
    id: string;
    uri: string;
    type: 'album';
    album_type: 'album' | 'single' | 'compilation';
    name: string;
    artist_name: string;
    cover: string;
  }
  
  export interface Paginated<T> {
    data: T[];
    limit?: number;
    next?: string | null;
    offset?: number;
    previous?: string | null;
    total?: number;
  }
  
  export interface SearchResponse {
    tracks: Paginated<TrackWithReview>;
    artists: Paginated<ArtistItem>;
    albums: Paginated<AlbumItem>;
  }