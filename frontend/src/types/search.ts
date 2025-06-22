export interface SearchParams {
    query: string;
    type?: 'track' | 'artist' | 'album';
    limit?: number;
    offset?: number;
  }
  
  export interface SearchTrack {
    id: string;
    name: string;
    artist: string;
    album?: string;
    cover?: string;
    isrc_id?: string;
  }
  
  export interface SearchResponse {
    tracks: {
      limit: number;
      next: any;
      offset: number;
      previous: any;
      total: number;
      data: SearchTrack[];
    };
  }