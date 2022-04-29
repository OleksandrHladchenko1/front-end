import React, { useEffect, useState } from "react";

import { CarCard } from "../../common/CarCard/CarCard";
import { Modal } from "../../common/Modal";

import { APIInteractor } from "../../../services/apiInteractor";

import './UserCarPage.scss';
import { AreYouSureModal } from "../../common/AreYouSureModal/AreYouSureModal";

export const UserCarPage = () => {
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiInteractor = new APIInteractor();

  useEffect(() => {
    apiInteractor.getUserCars(localStorage.getItem('userId')).then((data) => {
      setCars([...cars, ...data]);
    });
  }, []);

  useEffect(() => {
    console.log(cars);
  });

  const openModal = (id) => {
    setCarId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteCar = () => {
    setCars([...cars.filter((car) => car.id !== carId)]);
    apiInteractor.deleteUserCar(carId);
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
          headerText="Delete your car"
          mainText="Are you sure to delete this car?"
        />
      </Modal>
      <article className="my-car">
        <div className="my-car__container">
          <div className="my-car__title">
            <h1 className="my-car__title-text">Information about my cars</h1>
          </div>
          <div className="my-car__cars-container">
            { carsList }
          </div>
        </div>
      </article>
    </main>
  );
};
