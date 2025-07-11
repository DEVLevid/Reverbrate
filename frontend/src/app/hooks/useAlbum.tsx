"use client";

import { AlbumApi } from "@/infra/api/album";
import { useQuery } from "@tanstack/react-query";

export function useAlbum() {
    const getAlbum = (id: string) => useQuery({
        queryKey: ['album', id],
        queryFn: () => AlbumApi.getAlbum(id),
        enabled: !!id,
    });

    return {
        getAlbum,
    };
}
