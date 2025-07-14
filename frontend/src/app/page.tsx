import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Home from "./home/page";

export default async function RootPage() {
  return (
    <>
     <Home />
    </>
  );
}
