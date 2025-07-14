import NavBar from "../components/navBar/navBar";
import SearchContainer from "../components/search/searchContainer/SearchContainer";

export default async function Home() {
  return (
    <>
      <NavBar/>
      <main style={{ padding: '20px' }}>
        <SearchContainer />
      </main>
    </>
  );
} 