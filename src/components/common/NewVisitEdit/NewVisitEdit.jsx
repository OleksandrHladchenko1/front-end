import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Input } from "../Input";
import { Select } from "../Select";
import { Button } from "../Button";

import { APIInteractor } from "../../../services";
import { concatFullName, getDuration, newIssueShape, validateField, validateIsPastDate, validateWorkingDay, validateWorkingHour } from "../../../services/utils";

import './NewVisitEdit.scss';

export const NewVisitEdit = ({ visible, onSubmit }) => {
  const intl = useIntl();
  const apiInteractor = new APIInteractor()
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [newIssueInfo, setNewIssueInfo] = useState(newIssueShape);

  useEffect(() => {
    apiInteractor.getFullFreeWorkersInfo(newIssueInfo.startTime, newIssueInfo.endTime).then((data) => {
      setWorkers(data);
    });
  }, [newIssueInfo.startTime, newIssueInfo.endTime]);

  useEffect(() => {
    //setWorkers([]);
  }, []);

  const onChangeInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewIssueInfo({ ...newIssueInfo, [name]: value });
    setError({ ...error, isError: false });
  };

  const onChangeWorker = (e) => {
    const worker = workers.filter((worker) => worker.specialistId === parseInt(e.target.value))[0];
    setNewIssueInfo({
      ...newIssueInfo,
      ...worker,
    });
    setError({ ...error, isError: false });
  };

  const selectData = () => {
    const dataForRender = workers.map((worker) => {
      return {
        value: worker.specialistId,
        text: `${concatFullName(worker.firstName, worker.lastName, worker.fatherName)} (${worker.speciality})`,
      };
    });
    return dataForRender;
  };

  const validateNewIssueFields = () => {
    if(!validateField(newIssueInfo.description)) {
      setError({ isError: true, message: 'Description must be more than 3 symbols' });
      return false;
    }
    if(!validateWorkingHour(newIssueInfo.startTime) || !validateWorkingHour(newIssueInfo.endTime)) {
      setError({ isError: true, message: 'Sorry, we work from 8AM to 6PM :(' });
      return false;
    }
    if(!validateWorkingDay(newIssueInfo.startTime) || !validateWorkingDay(newIssueInfo.endTime)) {
      setError({ isError: true, message: 'Sorry, we don\'t work on weekends :(' });
      return false;
    }
   /*  if(!validateIsPastDate(newIssueInfo.startTime) || !validateIsPastDate(newIssueInfo.endTime)) {
      setError({ isError: true, message: 'Sorry, wrong date!' });
      return false;
    } */
    if(!validateField(newIssueInfo.price)) {
      setError({ isError: true, message: 'Please, fill in price!' });
      return false;
    }
    if(!validateField(newIssueInfo.lastName)) {
      setError({ isError: true, message: 'Please, choose one of the workers!' });
      return false;
    }

    return true;
  };

  const submitNewIssue = () => {
    if(validateNewIssueFields()) {
      onSubmit(newIssueInfo);
      setNewIssueInfo(newIssueShape)
    }
  };

  return visible && (
    <form className="edit">
      <div className="edit__container">
        <div className="edit__issue-info">
          <h3 className="edit__issue-title">
            <FormattedMessage id="newIssue.issueInfo.title" />
          </h3>
          <Input
            placeholder={intl.formatMessage({ id: 'newIssue.issueInfo.description.placeholder' })}
            className="edit__description form-input"
            name="description"
            label={<FormattedMessage id="newIssue.issueInfo.description.label" />}
            value={newIssueInfo.description}
            onChange={onChangeInfo}
            required
          />
          <Input
            type="datetime-local"
            className="edit__startTime form-input"
            name="startTime"
            label={<FormattedMessage id="newIssue.issueInfo.start.label" />}
            value={newIssueInfo.startTime}
            onChange={onChangeInfo}
            required
          />
          <Input
            type="datetime-local"
            className="edit__endTime form-input"
            name="endTime"
            label={<FormattedMessage id="newIssue.issueInfo.end.label" />}
            value={newIssueInfo.endTime}
            onChange={onChangeInfo}
            required
          />
          <Input
            type="number"
            className="edit__price form-input"
            name="price"
            label={<FormattedMessage id="newIssue.issueInfo.price.label" />}
            value={newIssueInfo.price}
            onChange={onChangeInfo}
            required
          />
        </div>
        <div className="edit__worker-info">
          <h3 className="edit__issue-title">
            <FormattedMessage id="newIssue.workerInfo.title" />
          </h3>
          <Select
            name="workers"
            label={<FormattedMessage id="newIssue.workerInfo.workers.label" />}
            className="edit__worker-select form-input"
            options={selectData()}
            onChange={onChangeWorker}
            required
          />
        </div>
        <div className="edit__duration">
          <h3 className="edit__duration-text">
            <FormattedMessage
              id="newIssue.workerInfo.duration"
              values={{ duration: `${getDuration(newIssueInfo.startTime, newIssueInfo.endTime)}` }}
            />
          </h3>
        </div>
        <div className="edit__errors">
          { error.isError &&
            <p className="edit__error-text error">{error.message}</p>
          }
        </div>
        <div className="edit__submit">
          <Button
            text={<FormattedMessage id="newIssue.workerInfo.button.save" />}
            onClick={submitNewIssue}
            className="edit__submit-button button success"
          />
        </div>
      </div>
    </form>    
  );
};
