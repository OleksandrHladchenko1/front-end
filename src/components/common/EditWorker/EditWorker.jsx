import React, { useEffect, useState } from "react";
import { APIInteractor } from "../../../services";

import { Close } from "../Close";
import { Input } from '../Input';
import { Logo } from "../Logo";

import remove from '../../../assets/cancel.svg';
import plus from '../../../assets/plus.svg';

import './EditWorker.scss';
import { Button } from "../Button";

export const EditWorker = ({ onClose, workerId }) => {
  const [workerInfo, setWorkerInfo] = useState({});
  const [workerSpecialities, setWorkerSpecialities] = useState([]);
  const [allSpecialities, setAllSpecialities] = useState([]);
  const apiIneractor = new APIInteractor();

  const removeSpeciality = (id) => {
    const speciality = workerSpecialities.find(speciality => speciality.id === id);
    const newWorkerSpecialities = workerSpecialities.filter(speciality => speciality.id !== id);
    const newAllSpecialities = [...allSpecialities, speciality];

    apiIneractor.deleteSpecialist(workerId, id).then(() => {
      setWorkerSpecialities(newWorkerSpecialities);
      setAllSpecialities(newAllSpecialities);
    });
  };

  const addSpeciality = (id) => {
    const speciality = allSpecialities.find(speciality => speciality.id === id);
    const newWorkerSpecialities = [...workerSpecialities, speciality];
    const newAllSpecialities = allSpecialities.filter(speciality => speciality.id !== id);

    apiIneractor.addSpecialist({
      id_worker: workerId,
      id_speciality: id,
      experience: 1000,
    }).then(() => {
      setWorkerSpecialities(newWorkerSpecialities);
      setAllSpecialities(newAllSpecialities);
    });
  };

  useEffect(() => {
    apiIneractor.getWorkerInfoById(workerId).then((data1) => {
      apiIneractor.getWorkerSpecialities(workerId).then((data2) => {
        apiIneractor.getAllSpecialities().then((data3) => {
          setWorkerInfo(data1);
          setWorkerSpecialities(data2);
          const newAllSpecialities = data3.filter(el => !data2.find(element => element.name === el.name));
          setAllSpecialities(newAllSpecialities);
        });
      });
    });
  }, []);

  useEffect(() => {
    console.log(workerInfo);
  });

  const onChangeInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setWorkerInfo({ ...workerInfo, [name]: value });
  };

  const saveChanges = (e) => {
    e.preventDefault();
    apiIneractor.editWorker(workerId, workerInfo);
    console.log('submit');
  };


  return (
    <form className="edit-worker" method="POST">
      <div className="edit-worker__left">
        <h2 className="edit-worker__left-title">Worker info</h2>
        <div className="edit-worker__inputs">
          <Input
            value={workerInfo.firstName}
            label="First Name"
            className="edit-worker__first-name form-input"
            onChange={onChangeInfo}
            name="firstName"
          />
          <Input
            value={workerInfo.lastName}
            label="Last Name"
            className="edit-worker__last-name form-input"
            onChange={onChangeInfo}
            name="lastName"
          />
          <Input
            value={workerInfo.fatherName}
            label="Father Name"
            className="edit-worker__father-name form-input"
            onChange={onChangeInfo}
            name="fatherName"
          />
          <Input
            value={workerInfo.email}
            label="E-mail"
            className="edit-worker__email form-input"
            onChange={onChangeInfo}
            name="email"
          />
          <Input
            value={workerInfo.phoneNumber}
            label="Phone Number"
            className="edit-worker__phone-number form-input"
            onChange={onChangeInfo}
            name="phoneNumber"
          />
          <Button
            text="Save changes"
            className="edit-worker__submit success button"
            onClick={saveChanges}
            type="submit"
          />
          <Button
            text="Close"
            className="edit-worker__close red-button button"
            onClick={onClose}
            type="submit"
          />
        </div>
      </div>
      <div className="edit-worker__right">
        <h2 className="edit-worker__right-title">Worker's speciality</h2>
        <div className="edit-worker__specialities">
          {
            workerSpecialities.map((speciality, i) => (
                <div className="edit-worker__speciality-container" key={i}>
                  <p>{speciality.name}</p>
                  <Logo
                  src={remove}
                  alt="delete"
                  className="edit-worker__delete-icon"
                  onClick={() => removeSpeciality(speciality.id)}
                />
                </div>
              )
            )
          }
        </div>
        <div className="edit-worker__all-specialities">
          <h3 className="edit-worker__all-title">All specialities</h3>
          {
            allSpecialities.map((speciality, i) => (
              <div className="edit-worker__speciality-container" key={i}>
                <p>{speciality.name}</p>
                <Logo
                  src={plus}
                  alt="delete"
                  className="edit-worker__add-icon"
                  onClick={() => addSpeciality(speciality.id)}
                />
              </div>
            )
          )
          }
        </div>
      </div>
      <Close onClick={onClose}/>
    </form>
  );
};
