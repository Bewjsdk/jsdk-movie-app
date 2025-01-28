import { useState, useEffect } from "react"
import { getTrendingMovies } from "../appwrite"
import { MetricsCollection } from "../interfaces"

const useTrending = () => {
  const [trending, setTrending] = useState<MetricsCollection[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadingTrending = async () => {
    setIsLoading(true)
    try {
      const trendingMovies = await getTrendingMovies() as MetricsCollection[]
      setTrending(trendingMovies ?? [])
    }
    catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
      else {
        setError("An unknown error occurred")
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadingTrending()
  }, [])

  return { trending, isLoading, error }
}

export { useTrending }