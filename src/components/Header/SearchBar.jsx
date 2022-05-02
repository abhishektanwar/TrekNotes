import React, { useState } from 'react'
import './Header.css'
const SearchBar = () => {
  return (
      <form className="search-bar-container">
        <input type="text" placeholder="search" />
        <i className="fa fa-search"> </i>
      </form>
  )
}

export default SearchBar
