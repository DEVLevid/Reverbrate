import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Player from "./components/player/player";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/login");
  }

  return (
    <>
      <Player />
    </>
  );
}
