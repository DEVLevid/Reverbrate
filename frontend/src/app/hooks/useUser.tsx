"use client";

import { UserApi } from "@/infra/api/user";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
    const getUserById = (id: string) =>
        useQuery({
            queryKey: ["profile"],
            queryFn: () => UserApi.getUser(id),
        });

    return {
        getUserById,
    };
}
