import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { Button } from "../Button";
import { Select } from "../Select";

import { APIInteractor } from "../../../services";
import { concatFullName, formatVisitDate } from "../../../services/utils";

import './IssueItem.scss';

export const IssueItem =  ({
  issue,
  onDelete,
  canDelete,
  canClose,  
}) => {
  console.log(issue);
  const apiInteractor = new APIInteractor();
  const [closed, setClosed] = useState(issue.closed);
  const [problems, setProblems] = useState([]);
  const onCloseIssue = (id) => {
    setClosed(true);
    apiInteractor.closeIssue(id);
  };

  useEffect(() => {
    apiInteractor.getProblemTypes().then((data) => {
      const newData = data.map((item) => ({
        value: item.id,
        text: item.name,
      }));
      setProblems(newData);
    });
  }, []);

  return (
    <div className="issue">
      <div className={`issue__overlay ${closed === 'No' ? '' : 'visible'}`}></div>
      <div className="issue__container">
        <h2 className="issue__info-heading">
          <FormattedMessage id="issueCard.issue.title" />
        </h2>
        <div className="issue__info">
          <div className="issue__info-container-left">
            <div className="issue__sub-info-left">
              <h3 className="issue__sub-info">
                <FormattedMessage id="issueCard.issue.description" />
              </h3>
              <p className="issue__sub-info-text">{issue.description}</p>
            </div>
            <div className="issue__sub-info-container">
              <h3 className="issue__sub-info">
                <FormattedMessage id="issueCard.worker.price" />
              </h3>
              <p className="issue__sub-info-text">{`${issue.price} UAH`}</p>
            </div>
            <div className="issue__sub-info-container">
              <Select
                name="problemType"
                label="Select problem type"
                options={problems}
                className="issue__select-problem-type"
                onChange={() => console.log('asd')}
                required
              />
            </div>
          </div>
          <div className="issue__info-container-right">

          </div>
          <div className="issue__buttons-container">

          </div>
        </div>
        { localStorage.getItem('startStatus') !== "User" &&
          <div className="issue__buttons">
            <div className="issue__buttons-container">
              { canDelete && 
                <Button
                  text={<FormattedMessage id="issueCard.button.delete" />}
                  className="issue__delete-button"
                  onClick={() => onDelete(issue.description)}
                />
              }
              { canClose &&
                <Button
                  text={<FormattedMessage id="issueCard.button.close" />}
                  className="issue__close-button"
                  onClick={() => onCloseIssue(issue.issueId)}
                />
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
};
