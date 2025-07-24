import { Profile, UpdateProfileRequest } from "@/types/profile";
import { apiRequest } from "./config";

export const ProfileApi = {
  getProfile: async (limit = 20, offset = 0): Promise<Profile> => {
    return apiRequest<Profile>(
      `/users/current?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
      }
    );
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<Profile> => {
    return apiRequest<Profile>(`/users/current`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};
