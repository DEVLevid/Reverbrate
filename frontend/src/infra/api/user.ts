import { User, UserSearchResponse, UserSearchResult } from "@/types/user";
import { apiRequest } from "./config";

export const UserApi = {
    getUser: async (id: string): Promise<User> => {
        return apiRequest<User>(`/users/${id}`, {
            method: "GET",
        });
    },

    updateFollow: async (id: string): Promise<void> => {
        return apiRequest<void>(`/users/${id}/follow`, {
            method: "PATCH",
        });
    },

    searchUsers: async (query: string, limit = 20, offset = 0) => {
        return apiRequest<{ data: UserSearchResult[]; limit: number; next: string | null; offset: number; previous: string | null; total: number }>(
            `/users/search?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
        );
    },
};
