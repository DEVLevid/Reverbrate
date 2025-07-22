import { User } from "@/types/user";
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
};
