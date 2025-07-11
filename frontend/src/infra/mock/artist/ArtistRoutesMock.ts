import { ApiError } from "../../api/config";
import { mockArtist } from "./artistMock";

export class ArtistRoutesMock {
    static async getArtist(id: string): Promise<Artist> {
        try {
            return new Promise((resolve) =>
                setTimeout(() => resolve(mockArtist), 2000)
            );
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(`Erro ao buscar artista: ${error.message}`);
            }
            throw new Error("Erro inesperado ao buscar artista");
        }
    }
}
