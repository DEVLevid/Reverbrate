interface ArtistTrack {
  id: string;
  uri: string;
  name: string;
  artist_name: string;
  cover: string;
  review: {
    rate: number;
    comment: string;
  };
}

interface Artist {
  id: string;
  name: string;
  cover: string;
  uri: string;
  tracks: ArtistTrack[];
}
