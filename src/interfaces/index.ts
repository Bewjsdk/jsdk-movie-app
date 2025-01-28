import { Models } from "appwrite";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MetricsCollection extends Models.Document {
  movie_id: number;
  poster_url: string;
  count: number;
  searchQuery: string;
}

export { type Movie, type MetricsCollection }