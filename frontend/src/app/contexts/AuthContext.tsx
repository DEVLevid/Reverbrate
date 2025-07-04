import { createContext, useContext, useEffect, useState } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { AuthApi } from "@/infra/api/auth";

type AuthContextType = {
  token: string | undefined;
  refreshToken: string | undefined;
};

const isTokenExpired = (token: string) => {
  if (!token) return true;

  const decodedToken = jwtDecode<{ exp: number }>(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export const AuthContext = createContext<AuthContextType>({
  token: undefined,
  refreshToken: undefined,
});

export const AuthProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const refreshToken = cookieStore.get("refresh_token");

  if (!token || !refreshToken) {
    redirect("/login");
  }

  if (isTokenExpired(token.value)) {
    AuthApi.refreshToken(refreshToken.value).catch((reason) => {
      console.error(reason);
      redirect("/login");
    });
  }

  return (
    <AuthContext.Provider
      value={{ token: token.value, refreshToken: refreshToken.value }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { token, refreshToken } = useContext(AuthContext);
  return { token, refreshToken };
};
