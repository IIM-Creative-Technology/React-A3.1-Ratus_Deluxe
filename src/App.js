import React, { useState, useEffect } from "react";

function App() {
  // Déclare un état qui stockera les films récupérés depuis l'API TMDB
  const [movies, setMovies] = useState([]);

  // Déclare un état qui stockera la page actuelle
  const [currentPage, setCurrentPage] = useState(1);

  // Déclare un état qui indique si les données sont en train d'être chargées
  const [isLoading, setIsLoading] = useState(false);

  // Lorsque la page actuelle change, effectue un fetch depuis l'API TMDB
  useEffect(() => {
    setIsLoading(true); // Définit le chargement comme étant en cours

    // Effectue un fetch à l'URL spécifié en incluant la clé API et la page actuelle
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=921efa34cf5f2f43581894a65a4dd941&language=en-US&page=${currentPage}`
    )
      .then((res) => res.json()) // Transforme la réponse en JSON
      .then((data) => {
        setMovies(data.results); // Stock les films récupérés dans l'état "movies"
        setIsLoading(false); // Définit le chargement comme étant terminé
      });
  }, [currentPage]); // La dépendance "currentPage" signifie que cet effet ne sera exécuté que lorsque "currentPage" change

  // Augmente la page actuelle de 1
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  // Diminue la page actuelle de 1
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="App">
      <h2>List of Popular Movies</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {movies.slice(0, 10).map((movie) => (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p>
                {movie.title} ({movie.release_date.substring(0, 4)})
              </p>
            </div>
          ))}
        </div>
      )}
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      <button onClick={handleNext} disabled={movies.length < 10}>
        Next
      </button>
    </div>
  );
}

export default App;
