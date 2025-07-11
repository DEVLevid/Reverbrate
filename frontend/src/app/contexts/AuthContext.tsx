import { AuthApi } from "@/infra/api/auth";
import { ProfileApi } from "@/infra/api/profile";
import { Profile } from "@/types/profile";
import { redirect, usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const publicRoutes = ["/login", "/register"];

interface AuthContextType {
  accessToken: string | null;
  profile: Profile | null;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  profile: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
  
    useEffect(() => {
      AuthApi.token()
        .then(({ access_token }) => {
          setAccessToken(access_token);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Erro ao autenticar");
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
      <AuthContext.Provider value={{ accessToken, profile }}>
        {children}
      </AuthContext.Provider>
    );
  };
