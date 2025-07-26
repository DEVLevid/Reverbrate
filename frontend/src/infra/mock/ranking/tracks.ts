import { RankingTrack } from "@/types/rankings";

export const top5Tracks: RankingTrack[] = [
  {
    rate: 5,
    comment: 'Ótima música!',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    track_info: {
      id: '1',
      name: 'Shape of You',
      artist: 'Ed Sheeran',
      cover: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
      review: null
    },
    created_by: {
      id: 'u1',
      name: 'User 1',
      image: ''
    },
    network: [
      {
        rate: 5,
        comment: 'Muito boa!',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        track_info: {
          id: '1',
          name: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
          review: null
        },
        created_by: {
          id: 'u10',
          name: 'Alice',
          image: 'https://i.scdn.co/image/ab6775700000ee85a9d63deebcefac355d0e19ef'
        }
      },
      {
        rate: 4,
        comment: 'Legal!',
        created_at: '2024-01-02',
        updated_at: '2024-01-02',
        track_info: {
          id: '1',
          name: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
          review: null
        },
        created_by: {
          id: 'u11',
          name: 'Cadu',
          image: 'https://i.scdn.co/image/ab6775700000ee85248794051a22f8b178e2fdb4'
        }
      },
      {
        rate: 3,
        comment: 'Mais ou menos',
        created_at: '2024-01-03',
        updated_at: '2024-01-03',
        track_info: {
          id: '1',
          name: 'Shape of You',
          artist: 'Ed Sheeran',
          cover: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
          review: null
        },
        created_by: {
          id: 'u12',
          name: 'Levid',
          image: 'https://i.scdn.co/image/ab6775700000ee8526676e509897b125145b53c3'
        }
      }
    ]
  },
  {
    rate: 4,
    comment: 'Muito boa!',
    created_at: '2024-01-02',
    updated_at: '2024-01-02',
    track_info: {
      id: '2',
      name: 'Blinding Lights',
      artist: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
      review: null
    },
    created_by: {
      id: 'u2',
      name: 'User 2',
      image: ''
    },
    network: [
      {
        rate: 5,
        comment: 'Amo!',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        track_info: {
          id: '2',
          name: 'Blinding Lights',
          artist: 'The Weeknd',
          cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
          review: null
        },
        created_by: {
          id: 'u13',
          name: 'Leonardo',
          image: 'https://i.scdn.co/image/ab6775700000ee85aee7f3b1fe8ab3bd553ce671'
        }
      },
      {
        rate: 4,
        comment: 'Top!',
        created_at: '2024-01-02',
        updated_at: '2024-01-02',
        track_info: {
          id: '2',
          name: 'Blinding Lights',
          artist: 'The Weeknd',
          cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
          review: null
        },
        created_by: {
          id: 'u14',
          name: 'Vinicius',
          image: 'https://i.scdn.co/image/ab6775700000ee858865d7b2d51ad6d290edb49c'
        }
      }
    ]
  },
  {
    rate: 5,
    comment: 'Top demais!',
    created_at: '2024-01-03',
    updated_at: '2024-01-03',
    track_info: {
      id: '3',
      name: 'Levitating',
      artist: 'Dua Lipa',
      cover: 'https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f',
      review: null
    },
    created_by: {
      id: 'u3',
      name: 'User 3',
      image: ''
    },
    network: [
      {
        rate: 5,
        comment: 'Perfeita!',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        track_info: {
          id: '3',
          name: 'Levitating',
          artist: 'Dua Lipa',
          cover: 'https://i.scdn.co/image/ab67616d0000b273b8b8b8b8b8b8b8b8b8b8b8b8',
          review: null
        },
        created_by: {
          id: 'u15',
          name: 'Alice',
          image: 'https://i.scdn.co/image/ab6775700000ee85a9d63deebcefac355d0e19ef'
        }
      }
    ]
  },
  {
    rate: 3,
    comment: 'Legalzinha!',
    created_at: '2024-01-04',
    updated_at: '2024-01-04',
    track_info: {
      id: '4',
      name: 'Peaches',
      artist: 'Justin Bieber',
      cover: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431',
      review: null
    },
    created_by: {
      id: 'u4',
      name: 'User 4',
      image: ''
    },
    network: [
      {
        rate: 3,
        comment: 'Gostei!',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        track_info: {
          id: '4',
          name: 'Peaches',
          artist: 'Justin Bieber',
          cover: 'https://i.scdn.co/image/ab67616d0000b273c9c9c9c9c9c9c9c9c9c9c9c9',
          review: null
        },
        created_by: {
          id: 'u16',
          name: 'Emile Paola',
          image: 'https://i.scdn.co/image/ab6775700000ee85a681ad980b2260706fd31ac5'
        }
      }
    ]
  },
  {
    rate: 5,
    comment: 'Emocionante!',
    created_at: '2024-01-05',
    updated_at: '2024-01-05',
    track_info: {
      id: '5',
      name: 'drivers license',
      artist: 'Olivia Rodrigo',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a',
      review: null
    },
    created_by: {
      id: 'u5',
      name: 'User 5',
      image: ''
    },
    network: [
      {
        rate: 5,
        comment: 'Chorei!',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        track_info: {
          id: '5',
          name: 'drivers license',
          artist: 'Olivia Rodrigo',
          cover: 'https://i.scdn.co/image/ab67616d0000b273e7e7e7e7e7e7e7e7e7e7e7e7',
          review: null
        },
        created_by: {
          id: 'u17',
          name: 'Emile Paola',
          image: 'https://i.scdn.co/image/ab6775700000ee85a681ad980b2260706fd31ac5'
        }
      }
    ]
  }
];