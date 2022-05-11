import { useState, FC, useEffect } from "react";
import "./Header.css";

interface SearchBarType{
  handleSearch:(input:string)=>void
}
const SearchBar:FC<SearchBarType> = ({handleSearch}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  useEffect(() => {
    if (searchInput===""){
      handleSearch("")
    }
  }, [searchInput])
  return (
    <form className="search-bar-container">
      <input
        type="text"
        placeholder="Search by note title..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <i className="fa fa-search" style={{cursor:'pointer'}} onClick={()=>handleSearch(searchInput)}> </i>
    </form>
  );
};

export default SearchBar;
