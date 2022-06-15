import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { APIInteractor } from "../../../services";
import { Button } from "../Button";

import { Close } from "../Close";
import { Input } from "../Input";

import './CreateWorkerModal.scss';

export const CreateWorkerModal = ({ onClose, onFinish }) => {
  const intl = useIntl();
  const apiIneractor = new APIInteractor();
  const [newWorker, setNewWorker] = useState({});
  const [error, setError] = useState({});

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
              <h2 className="new-worker__title">
                <FormattedMessage id="createWorker.modal.title" />
              </h2>
              <div className="new-worker__pib">
                <Input
                  name="firstName"
                  placeholder={intl.formatMessage({ id: 'createWorker.modal.firstName.placeholder' })}
                  className="new-worker__first-name form-input"
                  label={<FormattedMessage id="createWorker.modal.firstName.label" />}
                  onChange={onChangeInfo}
                  required
                />
                <Input
                  name="lastName"
                  placeholder={intl.formatMessage({ id: 'createWorker.modal.lastName.placeholder' })}
                  className="new-worker__last-name form-input"
                  label={<FormattedMessage id="createWorker.modal.lastName.label" />}
                  onChange={onChangeInfo}
                  required
                />
                <Input
                  name="fatherName"
                  placeholder={intl.formatMessage({ id: 'createWorker.modal.fatherName.placeholder' })}
                  className="new-worker__father-name form-input"
                  label={<FormattedMessage id="createWorker.modal.fatherName.label" />}
                  onChange={onChangeInfo}
                  required
                />
              </div>
              <div className="new-worker__phone-email">
                <Input
                  name="phoneNumber"
                  placeholder={intl.formatMessage({ id: 'createWorker.modal.phone.placeholder' })}
                  className="new-worker__phone form-input"
                  label={<FormattedMessage id="createWorker.modal.phone.label" />}
                  onChange={onChangeInfo}
                  required
                />
                <Input
                  name="email"
                  placeholder={intl.formatMessage({ id: 'createWorker.modal.email.placeholder' })}
                  className="new-worker__email form-input"
                  label={<FormattedMessage id="createWorker.modal.email.label" />}
                  onChange={onChangeInfo}
                  required
                />
              </div>
              <div className="new-worker__password">
                <Input
                  type="password"
                  name="password"
                  placeholder={intl.formatMessage({ id: 'createWorker.modal.password.placeholder' })}
                  className="new-worker__password form-input"
                  label={<FormattedMessage id="createWorker.modal.password.label" />}
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
                text={<FormattedMessage id="createWorker.modal.create.button" />}
                className="new-worker__submit-button button success"
                onClick={createWorker}
              />
            </div>
            <Close onClick={onClose} />
      </article>
    </main>
  );
};
