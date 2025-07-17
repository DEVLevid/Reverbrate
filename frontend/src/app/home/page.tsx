import NavBar from "../components/navBar/navBar";
import SearchContainer from "../components/search/searchContainer/SearchContainer";
import RecentActivity from "../components/recentActivity/recentActivity";

export default async function Home() {
  return (
    <>
      <NavBar/>
      <main style={{ padding: '20px' }}>
        <SearchContainer />
        <RecentActivity />
      </main>
    </>
  );
} 