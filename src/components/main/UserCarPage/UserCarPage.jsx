import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { CarCard } from "../../common/CarCard/CarCard";
import { Modal } from "../../common/Modal";
import { AreYouSureModal } from "../../common/AreYouSureModal";

import { APIInteractor } from "../../../services/apiInteractor";

import './UserCarPage.scss';

export const UserCarPage = () => {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiInteractor = new APIInteractor();

  useEffect(() => {
    apiInteractor.getUserCars(localStorage.getItem('userId')).then((data) => {
      setCars([...cars, ...data]);
    });
  }, []);

  useEffect(() => {
    console.log(car);
  });

  const openModal = (obj) => {
    setCar(obj);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteCar = () => {
    setCars([...cars.filter((car) => car.id !== car.ids)]);
    apiInteractor.deleteUserCar(car.ids);
    setIsModalOpen(false);
  };

  const carsList = cars.map((car, index) => {
    return (
      <CarCard key={index} car={car} onDelete={openModal} />
    );
  });

  return (
    <main>
      <Modal isModalOpen={isModalOpen}>
        <AreYouSureModal
          onCancel={closeModal}
          onSubmit={deleteCar}
          headerText={<FormattedMessage id="areYouSure.title.deleteCar" values={{ carName: car.carName }} />}
          mainText={<FormattedMessage id="areYouSure.text.deleteCar" />}
        />
      </Modal>
      <article className="my-car">
        <div className="my-car__container">
          <div className="my-car__title">
            <h1 className="my-car__title-text">
              <FormattedMessage id="userCarPage.title" />
            </h1>
          </div>
          <div className="my-car__cars-container">
            { carsList }
          </div>
        </div>
      </article>
    </main>
  );
};
