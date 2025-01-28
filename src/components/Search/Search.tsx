import { Dispatch } from "react";
import { BsSearch } from "react-icons/bs";


type SeachProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<React.SetStateAction<string>>
}

const Search = ({ searchQuery, setSearchQuery }: SeachProps) => {

  return (
    <div className="search text-white text-3xl">
      <form onSubmit={(e) => e.preventDefault()}>
        <BsSearch className="search-icon"/>

        <input 
          type="text" 
          name="searchQuery" 
          id="searchQuery" 
          placeholder="Discover movies and more..."
          aria-label="Search movies and more..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </div>
  )
}

export default Search