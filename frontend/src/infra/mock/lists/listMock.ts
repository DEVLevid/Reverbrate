import { List, TrackListItem, ArtistListItem, AlbumListItem } from '@/types/lists';

export const mockLists: List[] = [
  {
    id: '83946228-4100-4b4f-b7ed-a2e2f019bc4e',
    name: 'Melhores do zezo',
    type: 'track',
    items: [
      {
        id: '4oR9LgaHiNbnYBO76BrRIB',
        uri: 'spotify:track:4oR9LgaHiNbnYBO76BrRIB',
        name: 'Decida - Ao Vivo',
        artist_name: 'Zezo',
        cover: 'https://i.scdn.co/image/ab67616d0000b2734020586a6bc6313525410c7d',
      } as TrackListItem,
    ],
    created_at: '2025-07-10T05:47:48.357Z',
    updated_at: '2025-07-10T05:47:48.357Z',
    deleted_at: null,
  },
  {
    id: '83946228-4100-4b4f-b7ed-a2e2f019bc4f',
    name: 'Artistas que odeio',
    type: 'artist',
    items: [
      {
        id: '6qqNVTkY8uBg9cP3Jd7DAH',
        name: 'Billie Eilish',
        cover: 'https://i.scdn.co/image/ab6761610000e5eb046c38567ed0a30dc666f1ce',
        uri: 'spotify:artist:6qqNVTkY8uBg9cP3Jd7DAH',
      } as ArtistListItem,
    ],
    created_at: '2025-07-10T05:47:48.357Z',
    updated_at: '2025-07-10T05:47:48.357Z',
    deleted_at: null,
  },
  {
    id: '83946228-4100-4b4f-b7ed-a2e2f019bc4g',
    name: 'Albuns para ouvir chorando',
    type: 'album',
    items: [
      {
        id: '7aJuG4TFXa2hmE4z1yxc3n',
        name: 'HIT ME HARD AND SOFT',
        cover: 'https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62',
        artist_name: 'Billie Eilish',
        uri: 'spotify:album:7aJuG4TFXa2hmE4z1yxc3n',
      } as AlbumListItem,
    ],
    created_at: '2025-07-10T05:47:48.357Z',
    updated_at: '2025-07-10T05:47:48.357Z',
    deleted_at: null,
  },
];
