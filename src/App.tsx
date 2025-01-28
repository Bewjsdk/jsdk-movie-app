import { useState } from "react"

import Header from "./components/Header/Header"
import Search from "./components/Search/Search"
import Wrapper from "./components/Wrapper/Wrapper"
import { useFetchMovies } from "./hooks/useFetchMovies"
import Spinner from "./components/Spinner/Spinner"
import MovieCard from "./components/MovieCard/MovieCard"
import { useTrending } from "./hooks/useTrending"
import ErrorText from "./components/ErrorText/ErrorText"

const App = () => {
  // search state
  const [searchQuery, setSearchQuery] = useState("")
  const { error, isLoading, movieData } = useFetchMovies(searchQuery)
  const {
    error: errorTrending,
    isLoading: isLoadingTrending,
    trending,
  } = useTrending()

  return (
    <main>
      <div className="pattern">
        <Wrapper>
          <Header>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </Header>

          {isLoadingTrending ? (
            <Spinner>
              <span className="text-gray-200">Get trending please wait...</span>
            </Spinner>
          ) : errorTrending ? (
            <ErrorText>{errorTrending}</ErrorText>
          ) : (
            trending.length > 0 && (
              <section className="trending">
                <h2>Tredding Movies</h2>
                <ul>
                  {trending.map((movie, index) => (
                    <li key={movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  ))}
                </ul>
              </section>
            )
          )}

          <section className="all-movies">
            <h2>All Movies</h2>

            {isLoading ? (
              <Spinner>
                <span className="text-gray-200">Get movies please wait...</span>
              </Spinner>
            ) : error ? (
              <ErrorText>{error}</ErrorText>
            ) : (
              <article>
                {movieData.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </article>
            )}
          </section>
        </Wrapper>
      </div>
    </main>
  )
}

export default App
