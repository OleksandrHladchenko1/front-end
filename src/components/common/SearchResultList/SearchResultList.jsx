import React from "react";

import { SearchResultItem } from "../SearchResultItem/SearchResultItem";

import './SearchResultList.scss';

export const SearchResultList = ({ result, onClick }) => {
  const searchResult = result.map((item, i) => {
    return <SearchResultItem item={item} key={i} onClick={onClick} sequence={i} />
  });

  return (
    <div className="search-result">
      {searchResult}
    </div>
  )  
};
