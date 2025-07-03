"use client";

import { ProfileApi } from "@/infra/api/profile";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const getProfile = () => useQuery({
    queryKey: ['profile'],
    queryFn: () => ProfileApi.getProfile(),
  });

  return {
    getProfile,
  };
}
