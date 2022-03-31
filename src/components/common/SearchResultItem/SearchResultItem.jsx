import React from "react";

import { Button } from "../Button";

import { formatDate, formatTime } from "../../../services/utils";

import './SearchResultItem.scss';

export const SearchResultItem = ({ item, onClick, sequence }) => {
  const getClassName = () => {
    return `item ${sequence % 2 === 0 ? 'even' : 'odd'}`;
  };

  return (
    <div className={getClassName()}>
      { item.dateOfVisit && (
        <>
          <h3 className="item__date">{formatDate(item.dateOfVisit)}</h3>
          <h3 className="item__time">{formatTime(item.dateOfVisit)}</h3>
        </>
      )}
      <Button text="Details" onClick={onClick} className="item__details-button" />
    </div>
  );
}