import { Movie } from "../../interfaces"
import { FaStar } from "react-icons/fa";


type MovieCardProps = {
  movie: Movie
}

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}: MovieCardProps) => {
  return (
    <div className="movie-card">
      {/* Movie poster */}
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : `/no-movie.png`
        }
        alt={title}
      />

      {/* Movie contents */}
      <div className="mt-4">
        <h3>{title}</h3>
        {/* Content (rating, lang, year) */}
        <div className="content">
          <div className="rating">
            <FaStar color="gold"/>
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>⋅</span>
          <p className="lang">{original_language}</p>
          <span>⋅</span>
          <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
