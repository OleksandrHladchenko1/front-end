import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";

import { Select } from '../Select';
import { Button } from "../Button";

import { APIInteractor } from "../../../services";

import './ChooseExperience.scss';

export const ChooseExperience = ({ onFinish }) => {
  const [counter, setCounter] = useState(0);
  const [problems, setProblems] = useState([]);
  const [problemId, setProblemId] = useState('');
  const apiIneractor = new APIInteractor();

  useEffect(() => {
    apiIneractor.getProblemTypes().then(data => {
      const newData = data.map(item => ({
        text: item.name,
        value: item.id,
      }));
      setProblems(newData);
    });
  }, []);

  const increment = () => {
    if(counter >= 0 && counter < 20) {
      setCounter(counter + 1);
    }
  };
  const decrement = () => {
    if(counter > 0 && counter <= 20) {
      setCounter(counter - 1);
    }
  };

  const saveChanges = () => {
    onFinish(counter, problemId);
  }

  return (
    <div className="experience">
      <div className="experience__container">
        <div className="experience__choose">
          <h2 className="experience__title">
            <FormattedMessage id="experience.title.first" />
          </h2>
          <div className="experience__numbers">
            <div
              className={`experience__arrow-left ${counter === 0 ? '' : 'active-left' }`}
              onClick={decrement}
            ></div>
            <span className="experience__amount">{counter}</span>
            <div
              className={`experience__arrow-right ${counter === 20 ? '' : 'active-right'}`}
              onClick={increment}
            ></div>
          </div>
        </div>
        <div className="experience__problem">
          <h2 className="experience__title">
            <FormattedMessage id="experience.title.second" />
          </h2>
          <div className="experience__problem-container">
            <Select
              className="experience__problem-choose form-input"
              options={problems}
              onChange={(e) => setProblemId(e.target.value)}
              label={<FormattedMessage id="experience.speciality.label" />}
            />
          </div>
        </div>
        <div className="experience__save-container">
          <Button
            className="experience__save success button"
            text={<FormattedMessage id="experience.button.save" />}
            onClick={saveChanges}
          />
        </div>
      </div>
    </div>
  );
};
