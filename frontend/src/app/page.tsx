import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Home from "./home/page";

export default async function RootPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/login");
  }

  return (
    <>
     <Home />
    </>
  );
}
