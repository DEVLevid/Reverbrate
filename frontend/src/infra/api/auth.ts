import { apiRequest } from "./config";
import { SpotifyToken } from "../../types/auth";

export const AuthApi = {
  token: async (): Promise<SpotifyToken> => {
    return apiRequest<SpotifyToken>("/auth/token", {
      method: "GET",
    });
  },
};
