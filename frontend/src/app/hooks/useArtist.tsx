"use client";

import { ArtistApi } from "@/infra/api/artist";
import { useQuery } from "@tanstack/react-query";

export function useArtist() {
    const getArtist = (id: string) => useQuery({
        queryKey: ['artist', id],
        queryFn: () => ArtistApi.getArtist(id),
        enabled: !!id,
    });

    return {
        getArtist,
    };
}
