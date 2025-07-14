"use client";

import { AuthApi } from "@/infra/api/auth";
import { SignUpData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export function useAuth() {
  const tokenMutation = useMutation({
    mutationFn: () => AuthApi.token(),

    onSuccess: (data) => {
      console.log("Login bem-sucedido!", data.access_token);
    },
    onError: (error) => {
      console.error("Falha no login:", error);
    },
  });

  const signUp = useMutation({
    mutationFn: (data: SignUpData) => AuthApi.signup(data),
  });

  return {
    tokenMutation,
    signUp
  };
}
