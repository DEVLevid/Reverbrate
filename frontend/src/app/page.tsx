import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NavBar from "./components/navBar/navBar";
import SearchContainer from "./components/search/searchContainer/SearchContainer";
import RecentActivity from "./components/recentActivity/recentActivity";
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
