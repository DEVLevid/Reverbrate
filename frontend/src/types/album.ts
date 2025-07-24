interface AlbumTrack {
  id: string;
  uri: string;
  name: string;
  artist: string;
  cover: string;
  isrc_id: string;
  review: {
    rate: number;
    comment: string;
  };
}

interface Album {
  id: string;
  name: string;
  cover: string;
  artist_name: string;
  uri: string;
  tracks: AlbumTrack[];
}
