import React, { useState } from "react";
import { APIInteractor } from "../../../services";
import { concatFullName, formatVisitDate } from "../../../services/utils";
import { Button } from "../Button";

import './IssueItem.scss';

export const IssueItem =  ({ issue, onDelete }) => {
  console.log(issue);
  const apiInteractor = new APIInteractor();
  const [closed, setClosed] = useState(issue.closed);
  const onCloseIssue = (id) => {
    setClosed(true);
    console.log({
      id: issue.specialistId,
      isBusy: 'No',
      startTime: null,
      endTime: null,
    });
    apiInteractor.closeIssue(id).then(() => {
      apiInteractor.editSpecialistInfo({
        id: issue.specialistId,
        isBusy: 'No',
        startTime: null,
        endTime: null,
      });
    });
  };

  return (
    <div className="issue">
      <div className={`issue__overlay ${closed === 'No' ? '' : 'visible'}`}></div>
      <div className="issue__container">
        <div className="issue__info">
          <h2 className="issue__info-heading">Issue info</h2>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">Description</h3>
            <p className="issue__sub-info-text">{issue.description}</p>
          </div>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">Start</h3>
            <p className="issue__sub-info-text">{formatVisitDate(issue.startTime)}</p>
          </div>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">End</h3>
            <p className="issue__sub-info-text">{formatVisitDate(issue.endTime)}</p>
          </div>
        </div>
        <div className="issue__worker">
          <h2 className="issue__info-heading">Worker info</h2>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">Full name</h3>
            <p className="issue__sub-info-text">{concatFullName(issue.firstName, issue.lastName, issue.fatherName)}</p>
          </div>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">Speciality</h3>
            <p className="issue__sub-info-text">{`${issue.name} (${issue.experience} years)`}</p>
          </div>
          <div className="issue__sub-info-container">
            <h3 className="issue__sub-info">Price</h3>
            <p className="issue__sub-info-text">{`${issue.price} UAH`}</p>
          </div>
        </div>
        <div className="issue__buttons">
          <div className="issue__buttons-container">
            <Button
              text="Delete"
              className="issue__delete-button"
              onClick={() => onDelete(issue.issueId, issue.specialistId)}
            />
            <Button
              text="Close"
              className="issue__close-button"
              onClick={() => onCloseIssue(issue.issueId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
