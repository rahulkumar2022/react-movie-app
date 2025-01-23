import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const movies = [
    { id: 1, title: "John Wick", release_date: "2020" },
    { id: 2, title: "Testing movie", release_date: "2024" },
    { id: 3, title: "Testing movie 3", release_date: "2025" },
    { id: 4, title: "Testing movie 4", release_date: "2026" },
    { id: 5, title: "Testing movie 5", release_date: "2027" },
  ];

  const handleSearch = (e) => {
    //e.preventDafult();
    e.preventDefault();
    alert(searchQuery);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies ...."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="movies-grid">
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().startsWith(searchQuery) && (
              <MovieCard movie={movie} key={movie.id}></MovieCard>
            )
        )}
      </div>
    </div>
  );
}

export default Home;
