import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { Button } from "../Button";
import { Select } from "../Select";

import { APIInteractor } from "../../../services";
import { formatDate, formatTime, formatTime2, formatVisitDate, getDateForDatePicker, getDateForDatePickerLocal } from "../../../services/utils";

import './IssueItem.scss';
import { RequiredStar } from "../RequiredStar";

export const IssueItem =  ({
  issue,
  onDelete,
  canDelete,
  canSave,  
}) => {
  console.log(issue);
  const apiInteractor = new APIInteractor();
  const [closed, setClosed] = useState(issue.closed);
  const [isSaved, setIsSaved] = useState(false);
  const [problems, setProblems] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [newData, setNewData] = useState({});
  const onCloseIssue = (id) => {
    setClosed('Yes');
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

  useEffect(() => {
    console.log(newData);
    console.log(issue);
    console.log(closed);
  });

  const onSaveIssue = (id) => {
    if(newData.end) {
      setIsSaved(true);
      apiInteractor.updateStartEndSpecialist(id, newData);
    }
  };

  const getWorkersForProblemType = (id) => {
    apiInteractor.getFreeWorkersForTime(id).then((data) => {
      const prepareDataForSelectWorker = data.map(item => ({
        text: `${item.firstName} ${item.lastName} ${item.fatherName}`,
        value: item.specialistId
      }));
      setWorkers(prepareDataForSelectWorker);
    });
  };

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
            { (!issue.id_specialist && localStorage.getItem('isSorted') === 'Yes') && !isSaved &&
              <div className="issue__sub-info-container">
                <Select
                  name="problemType"
                  label="Select problem type"
                  options={problems}
                  className="issue__select-problem-type form-input"
                  onChange={(e) => getWorkersForProblemType(e.target.value)}
                  required
                />
              </div>
            }
          </div>
          <div className="issue__info-container-right">
            { !!workers.length && !isSaved && 
              <Select
                name="idSpecialist"
                label="Select worker"
                options={workers}
                className="issue__select-problem-type form-input"
                onChange={(e) => setNewData({ ...newData, idSpecialist: e.target.value })}
                required
              />
            }
            { !!newData.idSpecialist && !isSaved &&
              <>
                <label>Start<RequiredStar /></label>
                <input
                  type="datetime-local"
                  min={`${getDateForDatePickerLocal(new Date())}`}
                  className="form-input pick-date"
                  onChange={(e) => setNewData({ ...newData, start: e.target.value })}
                />
                <label>End<RequiredStar /></label>
                <input
                  type="datetime-local"
                  min={`${getDateForDatePickerLocal(new Date())}`}
                  className="form-input pick-date"
                  onChange={(e) => setNewData({ ...newData, end: e.target.value })}
                />
              </>
            }
            { (!!issue.id_specialist || isSaved ) && localStorage.getItem('visitStatus') !== 'Planned' &&
              <>
                <div className="issue__start-end-container">
                  <h3 className="issue__start">
                    Start: {`${formatDate(issue.startTime ?? newData.start)} ${formatTime(issue.startTime) || formatTime2(newData.start)}`}
                  </h3>
                  <h3 className="issue__end">
                    End: {`${formatDate(issue.endTime ?? newData.end)} ${formatTime(issue.endTime) || formatTime2(newData.end)}`}
                  </h3>
                </div>
              </>
            }
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
                  onClick={() => onDelete(issue.id)}
                />
              }
              { canSave && !isSaved && !issue.endTime &&
                <Button
                  text="Save"
                  className="issue__save-button button success"
                  onClick={() => onSaveIssue(issue.id)}
                />
              }
              { (isSaved || issue.id_specialist) &&
                <Button
                  text={<FormattedMessage id="issueCard.button.close" />}
                  className="issue__close-button button success"
                  onClick={() => onCloseIssue(issue.id)}
                />
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
};
