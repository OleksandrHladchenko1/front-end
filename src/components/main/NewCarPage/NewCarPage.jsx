import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../../common/Input";
import { Select } from "../../common/Select";
import { Button } from "../../common/Button";

import { APIInteractor } from "../../../services";
import { carcasTypes, carEngineTypes, carNumberSeries, carTransmissions, validateCarNumber, validateEngineNumber, validateField, validateYear } from "../../../services/utils";

import './NewCarPage.scss';

export const NewCarPage = () => {
  const apiInteractor = new APIInteractor();
  const navigate = useNavigate();
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [carInfo, setCarInfo] = useState({
    name: '',
    model: '',
    year: '',
    color: '',
    carcas: '',
    carCode: '',
    carNumber: '',
    carSeries: '',
    transmission: '',
    engine: '',
    engineNumber: '',
  });

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
      setError({ isError: true, message: 'Fill all the required fields!' });
      return false;
    }
    if(!validateYear(carInfo.year)) {
      setError({ isError: true, message: 'Wrong year!' });
      return false;
    }
    if(!validateCarNumber(carInfo.carNumber)) {
      setError({ isError: true, message: 'Wrong car number!' });
      return false;
    }
    if(!validateEngineNumber(carInfo.engineNumber)) {
      setError({ isError: true, message: 'Wrong engine number!' });
      return false;
    }
    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if(validateFields()) {
      apiInteractor.createCar(carInfo).then(() => navigate('/userPage'));
    }
  }

  return (
    <main>
      <article className="car">
        <form className="car__container" method="POST">  
          <div className="car__heading">
            <h1 className="car__heading-text">Car Info</h1>
            <div className="car__line"></div>
          </div>
          <div className="car__basic-info">
            <div className="car__basic-info-container">
              <Input
                placeholder="Name"
                className="car__name form-input"
                onChange={onChangeInfo}
                name="name"
                label="Car name"
                required
              />
              <Input
                placeholder="Model"
                className="car__model form-input"
                onChange={onChangeInfo}
                name="model"
                label="Model"
                required
              />
              <Input
                placeholder="Year"
                className="car__year form-input"
                onChange={onChangeInfo}
                name="year"
                label="Year"
                required
              />
              <Input
                placeholder="Color"
                className="car__color form-input"
                onChange={onChangeInfo}
                name="color"
                label="Color"
                required
              />
              <Select
                name="carcas"
                label="Carcas"
                options={carcasTypes}
                className="car__carcas form-input"
                onChange={onChangeInfo}
                required
              />
              <Select
                name="transmission"
                label="Transmission"
                options={carTransmissions}
                className="car__transmission form-input"
                onChange={onChangeInfo}
                required
              />
              <Select
                name="engine"
                label="Engine"
                options={carEngineTypes}
                className="car__engine form-input"
                onChange={onChangeInfo}
                required
              />
              <Input
                placeholder="Engine number"
                className="car__engineNumber form-input"
                onChange={onChangeInfo}
                name="engineNumber"
                label="Engine number"
                required
              />
              <div className="car__full-number">
                <Select
                  name="carCode"
                  label="Code"
                  options={carNumberSeries}
                  className="car__car-code form-input"
                  onChange={onChangeInfo}
                  required
                />
                <Input
                  placeholder="Car number"
                  className="car__number form-input"
                  onChange={onChangeInfo}
                  name="carNumber"
                  label="Car number"
                  required
                />
                { carInfo.carCode.trim() !== '' &&
                  <Select
                    name="carSeries"
                    label="Series"
                    options={getSeriesFromCode()}
                    className="car__car-series form-input"
                    onChange={onChangeInfo}
                    required
                  />
                }
              </div>
            </div>
          </div>
          <Button
            text="Add car"
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
