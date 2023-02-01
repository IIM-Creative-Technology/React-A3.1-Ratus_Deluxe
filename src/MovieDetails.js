import "./MovieDetails.css";
import React from "react";
import { useParams } from "react-router-dom";
import FlagIcon from "./components/FlagIcon.js";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=921efa34cf5f2f43581894a65a4dd941&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
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
    <div className="MovieDetails">
      <button onClick={() => window.history.back()}>Go Back</button>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
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
        {movie.production_companies.map((company) => company.name).join(", ")}
      </p>
      <p>
        Production Countries:{" "}
        {movie.production_countries.map((country) => country.name).join(", ")}
      </p>
      <p>
        Belongs To Collection:{" "}
        {movie.belongs_to_collection ? movie.belongs_to_collection.name : "No"}
      </p>
      <p>Budget: {movie.budget ? formatCurrency(movie.budget) : "No Data"}</p>
      <p>
        Revenue: {movie.revenue ? formatCurrency(movie.revenue) : "No Data"}
      </p>
      </div>
      
      <p>
        Watch here : <a href={movie.homepage}>{movie.homepage}</a>
      </p>

      
    </div>
  );
}

export default MovieDetails;
