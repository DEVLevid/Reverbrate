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
