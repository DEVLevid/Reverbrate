import { Profile } from "@/types/user";
import { apiRequest } from "./config";

export const ProfileApi = {
  getProfile: async (limit = 20, offset = 0): Promise<Profile> => {
    return apiRequest<Profile>(`/users/current?limit=${limit}&offset=${offset}`, {
      method: "GET",
    });
  },
};
