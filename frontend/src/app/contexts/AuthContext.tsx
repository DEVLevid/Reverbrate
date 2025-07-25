import { AuthApi } from "@/infra/api/auth";
import { redirect, usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const publicRoutes = ["/login", "/signup"];

interface AuthContextType {
  accessToken: string | null;
  needsSignup: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  needsSignup: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [needsSignup, setNeedsSignup] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (publicRoutes.includes(pathname)) {
      setLoading(false);
      return;
    }

    AuthApi.token()
      .then(({ access_token, needs_signup }) => {
        setAccessToken(access_token);
        setNeedsSignup(needs_signup);
      })
      .catch(() => {
        redirect("/login");
      })
      .finally(() => setLoading(false));
  }, [pathname]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!accessToken && !publicRoutes.includes(pathname)) {
    redirect("/login");
  }

  if (needsSignup && !publicRoutes.includes(pathname)) {
    redirect("/signup");
  }

  if (accessToken && !needsSignup && publicRoutes.includes(pathname)) {
    redirect("/");
  }

  return (
    <AuthContext.Provider value={{ accessToken, needsSignup }}>
      {children}
    </AuthContext.Provider>
  );
};
