import { SignUpData, SpotifyToken } from "../../types/auth";
import { apiRequest } from "./config";

export const AuthApi = {
  token: async (): Promise<SpotifyToken> => {
    return apiRequest<SpotifyToken>("/auth/token", {
      method: "GET",
    });
  },

  signup: async (data: SignUpData): Promise<void> => {
    return apiRequest<void>("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};
