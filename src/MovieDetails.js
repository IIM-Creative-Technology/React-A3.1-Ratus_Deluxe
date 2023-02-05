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
        window.location.reload();
        return;
      } else {
      localStorage.setItem(`film_${film.id}`, film.poster_path);
      window.location.reload();
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
    <div id="details_page">
      <button onClick={() => window.history.back()}>↩ Go Back</button>
      <section className="details_id">
      <div id="details_id">
        <div className="image">
        <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            onClick={() => saveImage(movie)} // Sauvegarde l'image dans le local storage
          />
        </div>
        <div>
          <h1>{movie.title}</h1>
          <h2>{movie.overview}</h2>
          <button
            className="favorite"
            onClick={() => saveImage(movie)}
          >
            {isImageSaved(movie) ? "❤️" : "🖤"}
          </button>
        </div>
      </div>
      </section>  
      
      <section className="details_content">
      <div id="details_content">
        <div>
          <p>
            <u>Movie title</u> :<br /> <h3>{movie.title}</h3>
          </p>

          <p>
            <u>Original Title</u> :<br /> <h3>{movie.original_title}</h3>
          </p>
          <p>
            <u>Runtime</u> :<br /> <h3>{movie.runtime} minutes</h3>
          </p>
        </div>
        <div>
          <p>
            <u>Original Language</u> :<br />{" "}
            <h2><FlagIcon code={getFlagCode(movie.original_language)} /></h2>
          </p>
          <p>
            <u>Genres</u> :<br />{" "}
            <h3>{movie.genres.map((genre) => genre.name).join(", ")}</h3>
          </p>
          <p>
            <u>Release Date</u> :<br /> <h3>{movie.release_date}</h3>
          </p>
        </div>
        <div>
          <p>
            <u>Rating</u> :<br /> <h3>{Math.round(movie.vote_average * 10)}%
            positives votes on {movie.vote_count} votes</h3>
          </p>

          <p>
            <u>Popularity</u> :<br /> <h3><DisplayStars score={movie.popularity} /></h3>
          </p>
          <p>
            <u>Belongs To Collection</u> :<br /><h3>{" "}
            {movie.belongs_to_collection
              ? movie.belongs_to_collection.name
              : "No"}</h3>
          </p>
        </div>

        <div>
          <p>
            <u>Production Companies</u> :<br /><h3>{" "}
            {movie.production_companies
              .map((company) => company.name)
              .join(", ")}</h3>
          </p>
          <p>
            <u>Budget</u> :<br /> <h3>{" "}
            {movie.budget ? formatCurrency(movie.budget) : "No Data"}</h3>
          </p>
          <p>
            <u>Revenue</u> :<br /> <h3>{" "}
            {movie.revenue ? formatCurrency(movie.revenue) : "No Data"}</h3>
          </p>
        </div>
      </div>
      </section>
      
      <section className="details_watch">
      <div id="details_watch">
        <a href={movie.homepage} target="_blank">
          <button>Watch here</button>
        </a>
      </div>
      </section>
      
      <section className="details_comments">
      <div id="details_comments">
        <button onClick={addComment}>Add Comment</button>
        <textarea id="comment" />
        <div id="comments"></div>
      </div>
      </section>
      <div></div>
    </div>
  );
}

export default MovieDetails;
