import React from "react";
import { FormattedMessage } from "react-intl";

import { SearchResultItem } from "../SearchResultItem/SearchResultItem";

import './SearchResultList.scss';

export const SearchResultList = ({ result, onClick }) => {
  const searchResult = result.map((item, i) => {
    return <SearchResultItem item={item} key={i} onClick={onClick} sequence={i} />
  });

  return (
    <div className="search-result">
      <div className="search-result__header">
        <h3 className="search-result__item">
          <FormattedMessage id="visitItem.header.date" />
        </h3>
        <h3 className="search-result__item">
          <FormattedMessage id="visitItem.header.time" />
        </h3>
        { localStorage.getItem('startStatus') !== 'User' ?
          <>
            <h3 className="search-result__item">
              <FormattedMessage id="visitItem.header.firstName" />
            </h3>
            <h3 className="search-result__item">
              <FormattedMessage id="visitItem.header.phoneNumber" />
            </h3>
          </> :
          <>
            <h3 className="search-result__item">-----</h3>
            <h3 className="search-result__item">-----</h3>
          </>
        }
        <h3 className="search-result__item">
          <FormattedMessage id="visitItem.header.comment" />
        </h3>
        <h3 className="search-result__item">
          <FormattedMessage id="visitItem.header.details" />
        </h3>
      </div>
      {searchResult}
    </div>
  )  
};
