import { User } from "@/types/user";
import { apiRequest } from "./config";

export const UserApi = {
    getUser: async (id: string): Promise<User> => {
        return apiRequest<User>(`/users/${id}`, {
            method: "GET",
        });
    },
};
