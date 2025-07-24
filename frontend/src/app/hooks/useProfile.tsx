"use client";

import { ProfileApi } from "@/infra/api/profile";
import { UpdateProfileRequest } from "@/types/profile";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useProfile(queryClient: QueryClient) {
  const getProfile = () =>
    useQuery({
      queryKey: ["profile"],
      queryFn: () => ProfileApi.getProfile(),
    });

  const updateProfile = useMutation({
    mutationFn: (data: UpdateProfileRequest) => ProfileApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });

  return {
    getProfile,
    updateProfile,
  };
}
