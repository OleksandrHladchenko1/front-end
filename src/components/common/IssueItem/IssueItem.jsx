import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import { Button } from "../Button";

import { APIInteractor } from "../../../services";
import { concatFullName, formatVisitDate } from "../../../services/utils";

import './IssueItem.scss';

export const IssueItem =  ({ issue, onDelete }) => {
  console.log(issue);
  const apiInteractor = new APIInteractor();
  const [closed, setClosed] = useState(issue.closed);
  const onCloseIssue = (id) => {
    setClosed(true);
    apiInteractor.closeIssue(id);
  };

  return (
    <div className="issue">
      <div className={`issue__overlay ${closed === 'No' ? '' : 'visible'}`}></div>
      <div className="issue__container">
        <div className="issue__info">
          <h2 className="issue__info-heading">
            <FormattedMessage id="issueCard.issue.title" />
          </h2>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">
              <FormattedMessage id="issueCard.issue.description" />
            </h3>
            <p className="issue__sub-info-text">{issue.description}</p>
          </div>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">
              <FormattedMessage id="issueCard.issue.start" />
            </h3>
            <p className="issue__sub-info-text">{formatVisitDate(issue.startTime)}</p>
          </div>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">
              <FormattedMessage id="issueCard.issue.end" />
            </h3>
            <p className="issue__sub-info-text">{formatVisitDate(issue.endTime)}</p>
          </div>
        </div>
        <div className="issue__worker">
          <h2 className="issue__info-heading">
            <FormattedMessage id="issueCard.worker.title" />
          </h2>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">
              <FormattedMessage id="issueCard.worker.fullName" />
            </h3>
            <p className="issue__sub-info-text">{concatFullName(issue.firstName, issue.lastName, issue.fatherName)}</p>
          </div>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">
              <FormattedMessage id="issueCard.worker.speciality" />
            </h3>
            <p className="issue__sub-info-text">{`${issue.name} (${issue.experience} years)`}</p>
          </div>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">
              <FormattedMessage id="issueCard.worker.price" />
            </h3>
            <p className="issue__sub-info-text">{`${issue.price} UAH`}</p>
          </div>
        </div>
        { localStorage.getItem('startStatus') !== "User" &&
          <div className="issue__buttons">
            <div className="issue__buttons-container">
              <Button
                text={<FormattedMessage id="issueCard.button.delete" />}
                className="issue__delete-button"
                onClick={() => onDelete(issue.issueId)}
              />
              <Button
                text={<FormattedMessage id="issueCard.button.close" />}
                className="issue__close-button"
                onClick={() => onCloseIssue(issue.issueId)}
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
};
