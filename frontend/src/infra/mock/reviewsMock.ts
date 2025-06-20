import { Review, TrackInfo } from "@/types/reviews";

export const mockComments: Review[] = [
    {
      id: "f86073ff-66df-45de-8f1e-48c4e9352893",
      track_info: {
        id: "6DzXaIgVIH7oLA1pkUtFaG",
        cover: "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400",
        isrc_id: "GBAHT0500600",
        name: "The Contract",
        artist: "Twenty One Pilots"
      },
      review: {
        rate: 3,
        comment: "Som legal"
      }
    },
    {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      track_info: {
        id: "4iV5W9uYEdYUVa79Axb7Rh",
        cover: "https://i.scdn.co/image/ab67616d0000b2732c8a11e48c91a1c3d6b3e3f4",
        isrc_id: "USRC12345678",
        name: "Bohemian Rhapsody",
        artist: "Queen"
      },
      review: {
        rate: 5,
        comment: "Clássico absoluto! Uma das melhores músicas já feitas."
      }
    },
    {
      id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
      track_info: {
        id: "7dGJo4pcD2V6o6AHaQHwT6",
        cover: "https://i.scdn.co/image/ab67616d0000b2733d4e5f6g7h8i9j0k1l2m3n4",
        isrc_id: "BRRBR1234567",
        name: "Garota de Ipanema",
        artist: "Tom Jobim"
      },
      review: {
        rate: 4,
        comment: "Bossa nova brasileira no seu melhor. Muito relaxante."
      }
    },
    {
      id: "c3d4e5f6-g7h8-9012-cdef-345678901234",
      track_info: {
        id: "1a2b3c4d-5e6f-7890-defg-456789012345",
        cover: "https://i.scdn.co/image/ab67616d0000b2734e5f6g7h8i9j0k1l2m3n4o5",
        isrc_id: "USRC87654321",
        name: "Imagine",
        artist: "John Lennon"
      },
      review: {
        rate: 5,
        comment: "Mensagem atemporal e melodia inesquecível."
      }
    },
    {
      id: "d4e5f6g7-h8i9-0123-defg-567890123456",
      track_info: {
        id: "2b3c4d5e-6f7g-8901-efgh-678901234567",
        cover: "https://i.scdn.co/image/ab67616d0000b2735f6g7h8i9j0k1l2m3n4o5p6",
        isrc_id: "BRRBR7654321",
        name: "Asa Branca",
        artist: "Luiz Gonzaga"
      },
      review: {
        rate: 4,
        comment: "Forró tradicional que conta a história do Nordeste."
      }
    }
  ];
  
  export const mockTrackInfo: TrackInfo = {
    id: "6DzXaIgVIH7oLA1pkUtFaG",
    cover: "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400",
    isrc_id: "GBAHT0500600",
    name: "The Contract",
    artist: "Twenty One Pilots"
  };