import { apiRequest } from "./config";

export const ArtistApi = {
   getArtist: async (id: string): Promise<Artist> => {
        return apiRequest<Artist>(`/artists/${id}`, {
            method: "GET",
        });
    },
};
