import { Client, Databases, ID, Query } from "appwrite"
import { Movie } from "./interfaces"

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID)

const databases = new Databases(client)

// Update search count in database
export const updateSearchCount = async (searchQuery: string, movie: Movie) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchQuery', searchQuery)
    ])

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1
      })
    } 
    else {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchQuery,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        movie_id: movie.id,
      })
    }

  } catch (err) {
    console.error(err)
  }
}

// get trending movie data
export const getTrendingMovies = async () => {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ])

    return res.documents
  }
  catch (err) {
    return err
  }
}