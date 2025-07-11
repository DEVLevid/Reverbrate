import { AuthApi } from "@/infra/api/auth";
import { redirect, usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const publicRoutes = ["/login", "/signup"];

interface AuthContextType {
  accessToken: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
  
    useEffect(() => {
      AuthApi.token()
        .then(({ access_token }) => {
          setAccessToken(access_token);
        })
        .finally(() => setLoading(false));
    }, []);

    
    if (loading) {
      return <div>Carregando...</div>;
    }

    if (!accessToken && !publicRoutes.includes(pathname)) {
      redirect("/login");
    }

    return (
      <AuthContext.Provider value={{ accessToken }}>
        {children}
      </AuthContext.Provider>
    );
  };
