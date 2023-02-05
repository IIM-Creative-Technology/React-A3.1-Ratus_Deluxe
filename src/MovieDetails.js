import "./MovieDetails.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FlagIcon from "./components/FlagIcon.js";

// Component qui affiche les détails d'un film
function MovieDetails() {
  // Récupération de l'ID du film à partir des paramètres de l'URL
  const { id } = useParams();

  // Etat pour stocker les informations du film
  const [movie, setMovie] = useState(null);

  // Effet qui charge les informations du film à partir de l'API
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=921efa34cf5f2f43581894a65a4dd941&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  }, [id]);

  // Affiche "Chargement..." tant que les informations du film n'ont pas été chargées
  if (!movie) {
    return <p>Loading...</p>;
  }

  // Formate un montant en tant que devise (USD)
  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  function addComment() {
    var comment = document.getElementById("comment").value;
    var comments = document.getElementById("comments");
    var newComment = document.createElement("pre");
    newComment.innerHTML = comment;
    comments.appendChild(newComment);
    document.getElementById("comment").value = "";
  }
  const languageCodeMap = {
    en: "gb",
    ko: "kr",
    ja: "jp",
    zh: "cn",
  };

  // Fonction qui récupère le code de la langue
  const getFlagCode = (language) => {
    return languageCodeMap[language] || language;
  };

    // Fonction qui sauvegarde les images dans le local storage
    const saveImage = (film) => {
      if (isImageSaved(film)) {
        localStorage.removeItem(`film_${film.id}`);
        return;
      } else {
      localStorage.setItem(`film_${film.id}`, film.poster_path);
      }
    }
  
    // Fonction qui vérifie si l'image est sauvegardée dans le local storage
    const isImageSaved = (film) => {
      return localStorage.getItem(`film_${film.id}`) !== null;
    }

  // Fonction qui affiche les étoiles
  function DisplayStars({ score }) {
    const maxStars = 5;
    const starPercentage = (score / 1000) * maxStars;
    const starDisplay = Array.from({ length: maxStars }, (_, index) => {
      const starValue = index + 1;
      return starValue <= starPercentage ? "⭐️" : "☆";
    });
    return <div>{starDisplay.join("")}</div>;
  }

  return (
    <div className="MovieDetails">
      <button onClick={() => window.history.back()}>Go Back</button>
      <div className="Movie">
        <div className="image">
        <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            onClick={() => saveImage(movie)} // Sauvegarde l'image dans le local storage
          />
        </div>
        <div className="informations">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <button
            className="favorite"
            onClick={() => saveImage(movie)}
          >
            {isImageSaved(movie) ? "❤️" : "🖤"}
          </button>
        </div>
      </div>
      <div id="data_container">
        <div className="movie_infos">
          <p>Movie title : {movie.title}</p>

          <p>Original Title: {movie.original_title}</p>
          <p>Runtime: {movie.runtime} minutes</p>
        </div>
        <div className="movie_data">
          <p>
            Original Language:{" "}
            <FlagIcon code={getFlagCode(movie.original_language)} />
          </p>
          <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <p>Status: {movie.status}</p>
          <p>Release Date: {movie.release_date}</p>
        </div>
        <div className="movie_stats">
          <p>
            Rating: {Math.round(movie.vote_average * 10)}% positives votes on{" "}
            {movie.vote_count} votes
          </p>

          <p style={{ display: "flex", alignItems: "center" }}>
            Popularity: <DisplayStars score={movie.popularity} />
          </p>
        </div>

        <div className="movie_team">
          <p>
            Production Companies:{" "}
            {movie.production_companies
              .map((company) => company.name)
              .join(", ")}
          </p>
          <p>
            Production Countries:{" "}
            {movie.production_countries
              .map((country) => country.name)
              .join(", ")}
          </p>
          <p>
            Belongs To Collection:{" "}
            {movie.belongs_to_collection
              ? movie.belongs_to_collection.name
              : "No"}
          </p>
          <p>
            Budget: {movie.budget ? formatCurrency(movie.budget) : "No Data"}
          </p>
          <p>
            Revenue: {movie.revenue ? formatCurrency(movie.revenue) : "No Data"}
          </p>
        </div>
      </div>

      <button>
        Watch here : <a href={movie.homepage}>{movie.homepage}</a>
      </button>
        <button onClick={addComment}>Add Comment</button>
        <textarea id="comment" />
        <div id="comments"></div>
      <div>
      </div>
    </div>
  );
}

export default MovieDetails;
