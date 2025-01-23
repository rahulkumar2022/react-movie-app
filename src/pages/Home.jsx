import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("Failed to load movie data");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);
  // const movies = [
  //   { id: 1, title: "John Wick", release_date: "2020" },
  //   { id: 2, title: "Testing movie", release_date: "2024" },
  //   { id: 3, title: "Testing movie 3", release_date: "2025" },
  //   { id: 4, title: "Testing movie 4", release_date: "2026" },
  //   { id: 5, title: "Testing movie 5", release_date: "2027" },
  // ];

  const handleSearch = async (e) => {
    //e.preventDafult();
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const searchMovie = await searchMovies(searchQuery);
      searchMovies(searchMovie);
      setError(null);
    } catch (err) {
      setError("Failed to find movies");
    } finally {
      setLoading(false);
    }
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
      {error && <div>{error}</div>}
      {loading ? (
        <div className="loading">Loading....</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().startsWith(searchQuery) && (
                <MovieCard movie={movie} key={movie.id}></MovieCard>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
