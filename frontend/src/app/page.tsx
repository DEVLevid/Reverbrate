import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Home from "./home/page";
import List from "./components/list/list";

export default async function RootPage() {
  return (
    <>
     <Home />
     <List />
    </>
  );
}
