import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { getDateForDatePicker } from "../../../services/utils";
import { Button } from "../Button";

import { APIInteractor } from "../../../services";

import "./DatePicker.scss";
import { RequiredStar } from "../RequiredStar";

export const DatePicker = ({ onChange }) => {
  const [chosenDate, setChosenDate] = useState('');
  const [freeTimes, setFreeTimes] = useState([]);
  const [finalDate, setFinalDate] = useState('');
  const apiInteractor = new APIInteractor();
  const today = new Date();

  useEffect(() => {
    getFreeTimesForDate();
  }, [chosenDate]);

  useEffect(() => {
    console.log(finalDate);
  })

  const getFreeTimesForDate = async () => {
    const date = new Date(chosenDate);
    apiInteractor.getFreeVisitsTime(getDateForDatePicker(date)).then((data) => {
      const todayDate = getDateForDatePicker(date);
      const times = data.filter(time => new Date(`${todayDate} ${time.time}`) > new Date());
      setFreeTimes(times);
    });
  };

  const onDatePickerChange = (e) => {
    setChosenDate(e.target.value);
  };

  const setTime = (e) => {
    setFinalDate(`${chosenDate} ${e.target.value}`);
    onChange(`${chosenDate} ${e.target.value}`);
    const previousButton = document.querySelector('.clicked');
    if(previousButton) {
      previousButton.classList.remove('clicked');
      e.target.classList.add('clicked');
    } else {
      e.target.classList.add('clicked');
    }
  };

  const buttonGroupWithTimes = freeTimes.map((time, i) => (
    <Button
      key={i}
      onClick={setTime}
      className={`button-time button-${time.time}`}
      text={time.time}
      value={time.time}
    />
  ));

  return (
    <div className="datepicker">
      <label>
        <FormattedMessage id="newVisit.date.label" />
        <RequiredStar />
      </label>
      <input
        type="date"
        min={`${getDateForDatePicker(today)}`}
        className="form-input pick-date"
        value={chosenDate}
        onChange={onDatePickerChange}
      />
      <div className="times-container">
        {buttonGroupWithTimes}
      </div>
    </div>
  )
};
