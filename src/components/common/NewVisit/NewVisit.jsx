import React, { useEffect, useState } from "react";

import { Button } from "../Button";
import { Close } from "../Close";
import { Input } from "../Input";

import { APIInteractor } from "../../../services";

import './NewVisit.scss';
import { validateField, validateIsCorrectDate, validateWorkingDay, validateWorkingHour } from "../../../services/utils";

export const NewVisit = ({ onClose, onSubmit }) => {
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const apiInteractor = new APIInteractor();
  const [visit, setVisit] = useState({
    dateOfVisit: '',
    comment: '',
  });

  const onChangeInfo = (e) => {
    setError({ ...error, isError: false });
    const name = e.target.name;
    const value = e.target.value;
    setVisit({ ...visit, [name]: value });
  };

  const validateVisitDate = () => {
    if(!validateField(visit.dateOfVisit)) {
      setError({ isError: true, message: 'Please, fill date and time' });
      return false;
    }
    if(!validateIsCorrectDate(visit.dateOfVisit)) {
      setError({ isError: true, message: 'Sorry, you chose wrong date :(' });
      return false;
    }
    if(!validateWorkingDay(visit.dateOfVisit)) {
      setError({ isError: true, message: 'Sorry, we don\'t work on weekends :(' });
      return false;
    }
    if(!validateWorkingHour(visit.dateOfVisit)) {
      setError({ isError: true, message: 'Sorry, we work from 8AM to 6PM :(' });
      return false;
    }

    return true;
  };

  const createVisit = (e) => {
    e.preventDefault();
    if(validateVisitDate()) {
      console.log('created');
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
          <h2 className="new-visit-title">Create new visit</h2>
        </div>
      </div>
      <div className="new-visit__inputs-container">
        <Input
          type="datetime-local"
          placeholder="Choose date"
          className="new-visit__date form-input"
          onChange={onChangeInfo}
          name="dateOfVisit"
          label="Visit date"
        />
        <div className="new-visit__comment-container">
          <label htmlFor="comment">Comment</label>
          <textarea
            className="new-visit__comment form-input"
            name="comment"
            placeholder="Your comment..."
            onChange={onChangeInfo}
          >
          </textarea>
        </div>
      </div>
      <div className="new-visit__button-container">
        <Button
          text="Create"
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
