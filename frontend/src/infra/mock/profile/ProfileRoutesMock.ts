import { Profile } from "@/types/profile";
import { ApiError } from "../../api/config";
import { mockProfile } from "./profileMock";

export class ProfileRoutesMock {
    static async getProfile(limit = 20, offset = 0): Promise<Profile> {
        try {
            return new Promise((resolve) =>
                setTimeout(() => resolve(mockProfile), 2000)
            );
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(`Erro ao buscar comentários: ${error.message}`);
            }
            throw new Error("Erro inesperado ao buscar comentários");
        }
    }
}
