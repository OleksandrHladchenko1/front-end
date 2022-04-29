import React from "react";
import { useNavigate } from "react-router-dom";

import { Logo } from "../Logo";
import { Button } from '../Button';

import ua_flag from '../../../assets/ua-flag.svg';

import './CarCard.scss';
import { extractFromCarNumber } from "../../../services/utils";

export const CarCard = ({ car, onDelete }) => {
  const navigate = useNavigate();
  const openEditPage = () => {
    const extractedNumber = extractFromCarNumber(car.number);
    localStorage.setItem('carInfo', JSON.stringify({
      ...car,
      ...extractedNumber,
    }));
    navigate('/car');
  };

  return (
    <div className="car-card">
      <div className="car-card__container">
        <div className="car-card__name-model">
          <h2 className="car-card__name-model-text">{`${car.name} ${car.model}`}</h2>
        </div>
        <div className="car-card__main-info">
          <div className="car-card__left">
            <div className="car-card__number">
              <h3 className="car-card__number-title">Car number</h3>
              <div className="car-card__number-card">
                <div className="car-card__number-flag">
                  <Logo src={ua_flag} alt="ua-flag" className="car-card__number-flag-ua" />
                  <p className="car-card__number-ua">UA</p>
                </div>
                <h4 className="car-card__number-text">{car.number}</h4>
              </div>
            </div>
            <div className="car-card__engine-number">
              <h3 className="car-card__engine-number-title">Engine number</h3>
              <div className="car-card__sub-info">
                <h4 className="car-card__engine-number-text grayed">{car.engineNumber}</h4>
              </div>
            </div>
            <div className="car-card__engine">
              <h3 className="car-card__engine-title">Engine type</h3>
              <div className="car-card__sub-info">
                <h4 className="car-card__engine-text grayed">{car.engine}</h4>
              </div>
            </div>
          </div>
          <div className="car-card__buttons">
            <div className="car-card__buttons-container">
              <Button
                text="Delete"
                className="car-card__button-delete"
                onClick={() => onDelete(car.id)}
              />
              <Button
                text="Edit"
                className="car-card__button-edit"
                onClick={openEditPage}
              />
            </div>
          </div>
          <div className="car-card__right">
            <div className="car-card__carcas">
              <h3 className="car-card__carcas-title">Carcas type</h3>
              <div className="car-card__sub-info">
                <h4 className="car-card__carcas-text grayed">{car.carcas}</h4>
              </div>
            </div>
            <div className="car-card__color">
              <h3 className="car-card__color-title">Color</h3>
              <div className="car-card__sub-info">
                <h4 className="car-card__color-text grayed">{car.color}</h4>
              </div>
            </div>
            <div className="car-card__color">
              <h3 className="car-card__color-title">Transmission type</h3>
              <div className="car-card__sub-info">
                <h4 className="car-card__color-text grayed">{car.transmission}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
