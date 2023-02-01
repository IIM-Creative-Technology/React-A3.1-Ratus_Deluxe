import './MovieDetails.css'
import React from "react";
import { useParams } from "react-router-dom";

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

  return (
    <div className="MovieDetails">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />
      <h1>{movie.title}</h1>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}

export default MovieDetails;
