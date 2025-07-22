"use client";

import { UserApi } from "@/infra/api/user";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useUser(queryClient: QueryClient) {
    const getUserById = (id: string) =>
        useQuery({
            queryKey: ["user", id],
            queryFn: () => UserApi.getUser(id),
        });

    const updateFollow = useMutation({
        mutationFn: (id: string) => UserApi.updateFollow(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["user", id],
            });
        },
    });

    return {
        getUserById,
        updateFollow,
    };
}
