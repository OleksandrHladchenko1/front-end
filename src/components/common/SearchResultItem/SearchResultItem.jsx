import React from "react";
import { FormattedMessage } from "react-intl";

import { Button } from "../Button";
import { NoValue } from '../NoValue';

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
          <h3 className="item__firstName">{item.firstName}</h3>
          <h3 className="item__phoneNumber">{item.phoneNumber}</h3>
          <h5 className="item__phoneNumber">{item.comment || <NoValue />}</h5>
        </>
      )}
      <Button
        text={<FormattedMessage id="visitItem.details" />}
        onClick={() => onClick(item.id, item.status)}
        className="item__details-button"
      />
    </div>
  );
}