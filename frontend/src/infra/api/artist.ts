import { apiRequest } from "./config";
import { Artist } from "@/types/artist";

export const ArtistApi = {
    getArtist: async (id: string): Promise<Artist> => {
        return apiRequest<Artist>(`/artists/${id}`, {
            method: "GET",
        });
    },
};
