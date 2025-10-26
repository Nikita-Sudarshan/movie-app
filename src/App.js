import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=51a90b78`);
    const data = await res.json();
    console.log(data);
    setMovies(data.Search || []); // fallback to [] if no results
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🎬 Movie Search App</h1>

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie name..."
      />
      <button onClick={searchMovies}>Search</button>

      {/* Movies List */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                margin: "10px",
                width: "200px",
                textAlign: "center",
              }}
            >
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{ width: "100%", borderRadius: "5px" }}
              />
            </div>
          ))
        ) : (
          <p>No movies yet. Try searching!</p>
        )}
      </div>
    </div>
  );
}

export default App;
