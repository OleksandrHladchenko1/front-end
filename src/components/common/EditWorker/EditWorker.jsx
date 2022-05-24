import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Close } from "../Close";
import { Input } from '../Input';
import { Logo } from "../Logo";
import { Button } from "../Button";

import { APIInteractor } from "../../../services";
import remove from '../../../assets/cancel.svg';
import plus from '../../../assets/plus.svg';

import './EditWorker.scss';

export const EditWorker = ({ onSubmit, onClose, workerId }) => {
  const intl = useIntl();
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
      experience: 1,
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
    apiIneractor.editWorker(workerId, workerInfo).then(() => onSubmit());
  };


  return (
    <form className="edit-worker" method="POST">
      <div className="edit-worker__left">
        <h2 className="edit-worker__left-title">
          <FormattedMessage id="editWorker.info.title" />
        </h2>
        <div className="edit-worker__inputs">
          <Input
            placeholder={intl.formatMessage({ id: 'editWorker.info.firstName.placeholder' })}
            value={workerInfo.firstName}
            label={<FormattedMessage id="editWorker.info.firstName.label" />}
            className="edit-worker__first-name form-input"
            onChange={onChangeInfo}
            name="firstName"
          />
          <Input
            placeholder={intl.formatMessage({ id: 'editWorker.info.lastName.placeholder' })}
            value={workerInfo.lastName}
            label={<FormattedMessage id="editWorker.info.lastName.label" />}
            className="edit-worker__last-name form-input"
            onChange={onChangeInfo}
            name="lastName"
          />
          <Input
            placeholder={intl.formatMessage({ id: 'editWorker.info.fatherName.placeholder' })}
            value={workerInfo.fatherName}
            label={<FormattedMessage id="editWorker.info.fatherName.label" />}
            className="edit-worker__father-name form-input"
            onChange={onChangeInfo}
            name="fatherName"
          />
          <Input
            placeholder={intl.formatMessage({ id: 'editWorker.info.email.placeholder' })}
            value={workerInfo.email}
            label={<FormattedMessage id="editWorker.info.email.label" />}
            className="edit-worker__email form-input"
            onChange={onChangeInfo}
            name="email"
          />
          <Input
            placeholder={intl.formatMessage({ id: 'editWorker.info.phone.placeholder' })}
            value={workerInfo.phoneNumber}
            label={<FormattedMessage id="editWorker.info.phone.label" />}
            className="edit-worker__phone-number form-input"
            onChange={onChangeInfo}
            name="phoneNumber"
          />
          <Button
            text={<FormattedMessage id="editWorker.button.save" />}
            className="edit-worker__submit success button"
            onClick={saveChanges}
            type="submit"
          />
          <Button
            text={<FormattedMessage id="editWorker.button.cancel" />}
            className="edit-worker__close red-button button"
            onClick={onClose}
            type="submit"
          />
        </div>
      </div>
      <div className="edit-worker__right">
        <h2 className="edit-worker__right-title">
          <FormattedMessage id="editWorker.worker.speciality.title" />
        </h2>
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
          <h3 className="edit-worker__all-title">
            <FormattedMessage id="editWorker.all.speciality.title" />
          </h3>
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
            ))
          }
        </div>
      </div>
      <Close onClick={onClose}/>
    </form>
  );
};
