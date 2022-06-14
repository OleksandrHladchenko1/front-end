import React, { useEffect, useState } from "react";
import { APIInteractor } from "../../../services";
import { Button } from "../Button";

import { Close } from "../Close";
import { Input } from "../Input";

import './CreateWorkerModal.scss';

export const CreateWorkerModal = ({ onClose, onFinish }) => {
  const apiIneractor = new APIInteractor();
  const [newWorker, setNewWorker] = useState({});
  const [error, setError] = useState({});

  /* useEffect(() => {
    console.log(newWorker);
  }); */

  const onChangeInfo = (e) => {
    setError({});
    const name = e.target.name;
    const value = e.target.value;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const createWorker = () => {
    apiIneractor.createWorker(newWorker).then(() => {
      onFinish();
      onClose();
    }).catch((data) => {
      setError({
        isError: true,
        message: data,
      });
    });
  };

  return (
    <main>
      <article className="new-worker">
         <div className="new-worker__container-create">
              <h2 className="new-worker__title">Create new worker</h2>
              <div className="new-worker__pib">
                <Input
                  name="firstName"
                  placeholder="Worker's first name..."
                  className="new-worker__first-name form-input"
                  label="First name"
                  onChange={onChangeInfo}
                  required
                />
                <Input
                  name="lastName"
                  placeholder="Worker's last name..."
                  className="new-worker__last-name form-input"
                  label="Last name"
                  onChange={onChangeInfo}
                  required
                />
                <Input
                  name="fatherName"
                  placeholder="Worker's father name..."
                  className="new-worker__father-name form-input"
                  label="Father name"
                  onChange={onChangeInfo}
                  required
                />
              </div>
              <div className="new-worker__phone-email">
                <Input
                  name="phoneNumber"
                  placeholder="Worker's phone number..."
                  className="new-worker__phone form-input"
                  label="Phone number"
                  onChange={onChangeInfo}
                  required
                />
                <Input
                  name="email"
                  placeholder="Worker's e-mail..."
                  className="new-worker__email form-input"
                  label="E-mail"
                  onChange={onChangeInfo}
                  required
                />
              </div>
              <div className="new-worker__password">
                <Input
                  type="password"
                  name="password"
                  placeholder="Worker's password..."
                  className="new-worker__password form-input"
                  label="Password"
                  onChange={onChangeInfo}
                  required
                />
              </div>
            </div>
            {error.isError &&
              <p className="error">{error.message}</p>
            }
            <div className="new-worker__submit">
              <Button
                text="Create"
                className="new-worker__submit-button button success"
                onClick={createWorker}
              />
            </div>
            <Close onClick={onClose} />
      </article>
    </main>
  );
};
