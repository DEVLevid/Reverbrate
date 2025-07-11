import { apiRequest } from "./config";

export const AlbumApi = {
   getAlbum: async (id: string): Promise<Album> => {
        return apiRequest<Album>(`/albums/${id}`, {
            method: "GET",
        });
    },
};
