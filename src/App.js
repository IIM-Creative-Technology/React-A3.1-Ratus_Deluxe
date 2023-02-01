import './App.css'
import React, { useState, useEffect } from "react";

// Le composant App qui affiche la liste des films populaires
function App() {
  // État qui stocke les films récupérés depuis l'API TMDB
  const [films, setFilms] = useState([]);

  const [filmsRaw, setFilmsRaw] = useState([]);

  // État qui stocke la page actuelle
  const [pageActuelle, setPageActuelle] = useState(1);

  // État qui indique si les données sont en train de charger
  const [enChargement, setEnChargement] = useState(false);

  // Lorsque la page actuelle change, effectue un fetch depuis l'API TMDB
  useEffect(() => {
    setEnChargement(true); // Définit que les données sont en train de charger

    // Fetch à l'URL spécifié avec la clé API et la page actuelle
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=921efa34cf5f2f43581894a65a4dd941&language=en-US&page=${pageActuelle}`
    )
      .then((res) => res.json()) // Transforme la réponse en JSON
      .then((data) => {
        setFilms(data.results); // Stocke les films récupérés dans l'état "films"
        setFilmsRaw(data.results); // Stocke les films récupérés dans l'état "filmsRaw"
        setEnChargement(false); // Définit que les données ont fini de charger
      });
  }, [pageActuelle]); // L'effet ne sera exécuté que si la page actuelle change

  // Augmente la page actuelle de 1
  const handleSuivant = () => {
    setPageActuelle(pageActuelle + 1);
  };

  // Diminue la page actuelle de 1
  const handlePrecedent = () => {
    setPageActuelle(pageActuelle - 1);
  };

  var isfilterenlish = false;
  var isfilterintheater = false;

  const handleEnglish = () => {
    const filterEnglish = films.filter((film) => {
      return film.original_language === "en";
    });
    isfilterenlish = !isfilterenlish;
    console.log(isfilterenlish);
    if (isfilterenlish === true) {
      
      setFilms(filterEnglish);
    } else {
      setFilms(films);
    }

  };

  const handleIntheaters = () => {
    const filterReleasedate = films.filter((film) => {
      return film.release_date > "2022-12-01";
    });
    isfilterintheater = !isfilterintheater;
    console.log(isfilterintheater);  
    if (isfilterintheater === true) {
      
      setFilms(filterReleasedate);
    } else {
      setFilms(films);
    }
  };

  const handlePopular = () => {
    setFilms(filmsRaw);
  };

  return (
    <div className='App'>
      <h2>Liste des Films Populaires</h2>
      <button onClick={handlePopular}>Films Populaires</button>
      <button onClick={handleEnglish}>En anglais</button>
      <button onClick={handleIntheaters}>À l'affiche</button>
      {enChargement ? (
        <p>Chargement...</p>
      ) : (
        <div id="conteneur_film">
          {films.slice(0, 10).map((film) => (
            <div key={film.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                alt={film.title}
              />
              <p>
                {film.title} ({film.release_date.substring(0, 4)})
              </p>
            </div>
          ))}
        </div>
      )}
      <button onClick={handlePrecedent} disabled={pageActuelle === 1}>
        Précédent
      </button>
      <button onClick={handleSuivant} disabled={films.length < 10}>
        Suivant
      </button>
    </div>
  );
}

export default App;
