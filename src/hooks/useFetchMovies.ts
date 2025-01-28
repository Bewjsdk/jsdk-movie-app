import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce";
import { Movie } from "../interfaces";
import { updateSearchCount } from "../appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_ENDPOINT = "/discover/movie?sort_by=popularity.desc"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const useFetchMovies = (searchQuery: string) => {
  const [movieData, setMovieData] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Debounce the search query to prevent excessive API calls
  const [queryDebounce] = useDebounce(searchQuery, 500)

  useEffect(() => {
    const fetchMoviesAPI = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const endpoint = queryDebounce ? `/search/movie?query=${encodeURIComponent(queryDebounce)}` : API_ENDPOINT

        const res = await fetch(`${API_BASE_URL}${endpoint}`, API_OPTIONS)
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()

        setMovieData(data.results || [])

        if (queryDebounce && data.results.length > 0) {
          await updateSearchCount(queryDebounce, data.results[0]) // Update the search count for the first result only
        }
      }
      catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unexpected error occurred")
        }
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchMoviesAPI()
  }, [queryDebounce])

  return { movieData, isLoading, error }
}

export { useFetchMovies }