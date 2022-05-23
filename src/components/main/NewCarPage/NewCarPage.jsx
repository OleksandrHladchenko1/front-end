import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

import { Input } from "../../common/Input";
import { Select } from "../../common/Select";
import { Button } from "../../common/Button";

import { APIInteractor } from "../../../services";
import {
  carcasTypes,
  carEngineTypes,
  carNumberSeries,
  carTransmissions,
  newCarShape,
  validateCarNumber,
  validateEngineNumber,
  validateField,
  validateYear,
} from "../../../services/utils";

import './NewCarPage.scss';

export const NewCarPage = () => {
  const intl = useIntl();
  const apiInteractor = new APIInteractor();
  const navigate = useNavigate();
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [carInfo, setCarInfo] = useState(JSON.parse(localStorage.getItem('carInfo')) ?? newCarShape);

  useEffect(() => {
    console.log(error);
  });

  const onChangeInfo = (e) => {
    setError({ ...error, isError: false });
    const name = e.target.name;
    const value = e.target.value;
    setCarInfo({ ...carInfo, [name]: value });
  };

  const getSeriesFromCode = () => {
    return carNumberSeries.filter((number) => number.value === carInfo.carCode)[0].series;
  }

  const validateFields = () => {
    if(!validateField(carInfo.name) ||
      !validateField(carInfo.color) ||
      !validateField(carInfo.model) || 
      !validateField(carInfo.year) ||
      !validateField(carInfo.carcas) ||
      !validateField(carInfo.transmission) ||
      !validateField(carInfo.engine) ||
      !validateField(carInfo.engineNumber) ||
      !validateField(carInfo.carCode) ||
      !validateField(carInfo.carNumber) ||
      !validateField(carInfo.carSeries)
    ) {
      setError({ isError: true, message: <FormattedMessage id="carForm.error.requiredFields" /> });
      return false;
    }
    if(!validateYear(carInfo.year)) {
      setError({ isError: true, message: <FormattedMessage id="carForm.error.wrongYear" /> });
      return false;
    }
    if(!validateCarNumber(carInfo.carNumber)) {
      setError({ isError: true, message: <FormattedMessage id="carForm.error.wrongCarNumber" /> });
      return false;
    }
    if(!validateEngineNumber(carInfo.engineNumber)) {
      setError({ isError: true, message: <FormattedMessage id="carForm.error.wrongEngineNumber" /> });
      return false;
    }
    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if(validateFields()) {
      if(!localStorage.getItem('carInfo')) {
        apiInteractor.createCar(carInfo).then(() => navigate('/my-cars'));
      } else {
        apiInteractor.editUserCar(carInfo, localStorage.getItem('userId')).then(() => navigate('/my-cars'));
        localStorage.removeItem('carInfo');
      }
    }
  }

  return (
    <main>
      <article className="car">
        <form className="car__container" method="POST">  
          <div className="car__heading">
            <h1 className="car__heading-text">
              <FormattedMessage id="carForm.title" />
            </h1>
            <div className="car__line"></div>
          </div>
          <div className="car__basic-info">
            <div className="car__basic-info-container">
              <Input
                placeholder={intl.formatMessage({ id: 'carForm.name.placeholder' })}
                className="car__name form-input"
                onChange={onChangeInfo}
                name="name"
                label={<FormattedMessage id="carForm.name.label" />}
                value={carInfo.name}
                required
              />
              <Input
                placeholder={intl.formatMessage({ id: 'carForm.model.placeholder' })}
                className="car__model form-input"
                onChange={onChangeInfo}
                name="model"
                label={<FormattedMessage id="carForm.model.label" />}
                value={carInfo.model}
                required
              />
              <Input
                placeholder={intl.formatMessage({ id: 'carForm.year.placeholder' })}
                className="car__year form-input"
                onChange={onChangeInfo}
                name="year"
                label={<FormattedMessage id="carForm.year.label" />}
                value={carInfo.year}
                required
              />
              <Input
                placeholder={intl.formatMessage({ id: 'carForm.color.placeholder' })}
                className="car__color form-input"
                onChange={onChangeInfo}
                name="color"
                label={<FormattedMessage id="carForm.color.label" />}
                value={carInfo.color}
                required
              />
              <Select
                name="carcas"
                label={<FormattedMessage id="carForm.carcas.label" />}
                options={carcasTypes}
                className="car__carcas form-input"
                onChange={onChangeInfo}
                value={carInfo.carcas}
                required
              />
              <Select
                name="transmission"
                label={<FormattedMessage id="carForm.transmission.label" />}
                options={carTransmissions}
                className="car__transmission form-input"
                onChange={onChangeInfo}
                value={carInfo.transmission}
                required
              />
              <Select
                name="engine"
                label={<FormattedMessage id="carForm.engine.label" />}
                options={carEngineTypes}
                className="car__engine form-input"
                onChange={onChangeInfo}
                value={carInfo.engine}
                required
              />
              <Input
                placeholder={intl.formatMessage({ id: 'carForm.engineNumber.placeholder' })}
                className="car__engineNumber form-input"
                onChange={onChangeInfo}
                name="engineNumber"
                label={<FormattedMessage id="carForm.engineNumber.label" />}
                value={carInfo.engineNumber}
                required
              />
              <div className="car__full-number">
                <Select
                  name="carCode"
                  label={<FormattedMessage id="carForm.carCode.label" />}
                  options={carNumberSeries}
                  className="car__car-code form-input"
                  onChange={onChangeInfo}
                  value={carInfo.carCode}
                  required
                />
                <Input
                  placeholder={intl.formatMessage({ id: 'carForm.carNumber.placeholder' })}
                  className="car__number form-input"
                  onChange={onChangeInfo}
                  name="carNumber"
                  label={<FormattedMessage id="carForm.carNumber.label" />}
                  value={carInfo.carNumber}
                  required
                />
                { carInfo.carCode &&
                  <Select
                    name="carSeries"
                    label={<FormattedMessage id="carForm.carSeries.label" />}
                    options={getSeriesFromCode()}
                    className="car__car-series form-input"
                    onChange={onChangeInfo}
                    value={carInfo.carSeries}
                    required
                  />
                }
              </div>
            </div>
          </div>
          <Button
            text={<FormattedMessage id="carForm.button.save" />}
            onClick={submit}
            type="submit"
            className="car__submit button success"
          />
          { error.isError && 
            <p className="car__error-text error">{error.message}</p>
          }
        </form>
      </article>
    </main>
  );
};
