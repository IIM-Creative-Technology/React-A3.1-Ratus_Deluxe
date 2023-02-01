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

  return (
    <div className="MovieDetails">
      <button onClick={() => window.history.back()}>Go Back</button>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
      <p>
        Production Companies:{" "}
        {movie.production_companies.map((company) => company.name).join(", ")}
      </p>
      <p>
        Production Countries:{" "}
        {movie.production_countries.map((country) => country.name).join(", ")}
      </p>
      <p>Tagline: {movie.tagline}</p>
      <p>Revenue: {formatCurrency(movie.revenue)}</p>
      <p>Budget: {formatCurrency(movie.budget)}</p>
      <p>
        Homepage: <a href={movie.homepage}>{movie.homepage}</a>
      </p>
      <p>IMDB ID: {movie.imdb_id}</p>

      <p>
        Original Language: <FlagIcon code={movie.original_language === "en" ? "gb" : movie.original_language } />
      </p>

      <p>Original Title: {movie.original_title}</p>
      <p>Popularity: {movie.popularity}</p>
      <p>Status: {movie.status}</p>
      <p>Video: {movie.video ? "Yes" : "No"}</p>
      <p>Votes: {movie.vote_count}</p>
      <p>Adult: {movie.adult ? "Yes" : "No"}</p>
      <p>Backdrop Path: {movie.backdrop_path}</p>
      <p>
        Belongs To Collection:{" "}
        {movie.belongs_to_collection ? movie.belongs_to_collection.name : "No"}
      </p>
      <div>
        <button onClick={addComment}>Add Comment</button>
        <textarea id="comment" />
        <div id="comments"></div>
      </div>
    </div>
  );
}

export default MovieDetails;
