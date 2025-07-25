import { apiRequest } from "./config";
import { Album } from "@/types/album";

export const AlbumApi = {
    getAlbum: async (id: string): Promise<Album> => {
        return apiRequest<Album>(`/albums/${id}`, {
            method: "GET",
        });
    },
};
