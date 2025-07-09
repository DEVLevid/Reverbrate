"use client";

import { ArtistApi } from "@/infra/api/artist";
import { ArtistRoutesMock } from "@/infra/mock/artist/ArtistRoutesMock";
import { useQuery } from "@tanstack/react-query";

export function useArtist() {
    const getArtist = (id: string) => useQuery({
        queryKey: ['artist', id],
        queryFn: () => ArtistRoutesMock.getArtist(id),
        enabled: !!id,
    });

    return {
        getArtist,
    };
}
