import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Button } from "../Button";
import { Close } from "../Close";
import { Input } from "../Input";
import { Select } from "../Select";

import { APIInteractor } from "../../../services";

import './NewVisit.scss';
import {
  validateField,
  validateIsPastDate,
  validateWorkingDay,
  validateWorkingHour,
} from "../../../services/utils";

const NewVisit = ({ onClose, onSubmit, intl }) => {
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const apiInteractor = new APIInteractor();
  const [visit, setVisit] = useState({
    dateOfVisit: '',
    carId: '',
    comment: '',
  });
  const [userCars, setUserCars] = useState([]);

  useEffect(() => {
    apiInteractor.getUserCars(localStorage.getItem('userId')).then((data) => {
      const newData = data.map(item => ({
        value: item.id,
        text: `${item.name} ${item.model} (${item.color})`,
      }));
      setUserCars(newData);
    });
  }, []);

  useEffect(() => {
    console.log(visit);
  });

  const onChangeInfo = (e) => {
    setError({ ...error, isError: false });
    const name = e.target.name;
    const value = e.target.value;
    setVisit({ ...visit, [name]: value });
  };

  const validateVisitDate = () => {
    if(!validateField(visit.dateOfVisit)) {
      setError({ isError: true, message: <FormattedMessage id="newVisit.error.date.fill" /> });
      return false;
    }
    if(!validateIsPastDate(visit.dateOfVisit)) {
      setError({ isError: true, message: <FormattedMessage id="newVisit.error.date.wrongDate" /> });
      return false;
    }
    if(!validateWorkingDay(visit.dateOfVisit)) {
      setError({ isError: true, message: <FormattedMessage id="newVisit.error.date.weekends" /> });
      return false;
    }
    if(!validateWorkingHour(visit.dateOfVisit)) {
      setError({ isError: true, message: <FormattedMessage id="newVisit.error.date.notWorkHours" /> });
      return false;
    }
    if(!validateField(visit.carId)) {
      setError({ isError: true, message: <FormattedMessage id="newVisit.error.car.fill" /> });
      return false;
    }

    return true;
  };

  const createVisit = (e) => {
    e.preventDefault();
    if(validateVisitDate()) {
      apiInteractor.createVisit(visit).then(() => {
        onClose();
        onSubmit();
      });
    }
  };

  return (
    <form className="new-visit" method="POST">
      <div className="new-visit__heading-container">
        <div className="new-visit__heading">
          <h2 className="new-visit-title">
            <FormattedMessage id="newVisit.title" />
          </h2>
        </div>
      </div>
      <div className="new-visit__inputs-container">
        <Input
          type="datetime-local"
          placeholder={intl.formatMessage({ id: "newVisit.date.placeholder" })}
          className="new-visit__date form-input"
          onChange={onChangeInfo}
          name="dateOfVisit"
          label={<FormattedMessage id="newVisit.date.label" />}
          required
        />
        <Select
          options={userCars}
          label={<FormattedMessage id="newVisit.car.label" />}
          className="new-visit__car form-input"
          onChange={onChangeInfo}
          name="carId"
          required
        />
        <div className="new-visit__comment-container">
          <label htmlFor="comment">
            <FormattedMessage id="newVisit.comment.label" />
          </label>
          <textarea
            className="new-visit__comment form-input"
            name="comment"
            placeholder={intl.formatMessage({ id: "newVisit.comment.placeholder" })}
            onChange={onChangeInfo}
          >
          </textarea>
        </div>
      </div>
      <div className="new-visit__button-container">
        <Button
          text={<FormattedMessage id="newVisit.create" />}
          onClick={createVisit}
          className="new-visit__button form-button"
          type="submit"
        />
      </div>
      <div className="new-visit__errors">
        { error.isError && <p className="new-visit__error-message error">{error.message}</p> }
      </div>
      <Close onClick={onClose}/>
    </form>
  );
};

export default injectIntl(NewVisit);
