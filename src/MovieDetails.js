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

  const getFlagCode = (language) => {
    return languageCodeMap[language] || language;
  };

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
    <div id="details_page">
      <button onClick={() => window.history.back()}>↩ Go Back</button>
      <hr />
      <div id="details_id">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      </div>
      <hr />
      <div id="details_content">
        <div>
          <p>
            <u>Movie title</u> :<br /> {movie.title}
          </p>

          <p>
            <u>Original Title</u> :<br /> {movie.original_title}
          </p>
          <p>
            <u>Runtime</u> :<br /> {movie.runtime} minutes
          </p>
        </div>
        <div>
          <p>
            <u>Original Language</u> :<br />{" "}
            <FlagIcon code={getFlagCode(movie.original_language)} />
          </p>
          <p>
            <u>Genres</u> :<br />{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <u>Release Date</u> :<br /> {movie.release_date}
          </p>
        </div>
        <div>
          <p>
            <u>Rating</u> :<br /> {Math.round(movie.vote_average * 10)}%
            positives votes on {movie.vote_count} votes
          </p>

          <p>
            <u>Popularity</u> :<br /> <DisplayStars score={movie.popularity} />
          </p>
          <p>
            <u>Belongs To Collection</u> :<br />{" "}
            {movie.belongs_to_collection
              ? movie.belongs_to_collection.name
              : "No"}
          </p>
        </div>

        <div>
          <p>
            <u>Production Companies</u> :<br />{" "}
            {movie.production_companies
              .map((company) => company.name)
              .join(", ")}
          </p>
          <p>
            <u>Budget</u> :<br />{" "}
            {movie.budget ? formatCurrency(movie.budget) : "No Data"}
          </p>
          <p>
            <u>Revenue</u> :<br />{" "}
            {movie.revenue ? formatCurrency(movie.revenue) : "No Data"}
          </p>
        </div>
      </div>
      <hr />
      <div id="details_watch">
        <button>
          <u>Watch here</u> :<br />{" "}
          <a href={movie.homepage}>{movie.homepage}</a>
        </button>
      </div>
      <hr />
      <div id="details_comments">
        <button onClick={addComment}>Add Comment</button>
        <textarea id="comment" />
        <div id="comments"></div>
      </div>
      <div></div>
    </div>
  );
}

export default MovieDetails;
