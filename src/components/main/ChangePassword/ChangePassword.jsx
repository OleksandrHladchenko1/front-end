import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FormattedMessage, useIntl } from "react-intl";

import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

import { APIInteractor } from "../../../services";

import './ChangePassword.scss';

export const ChangePassword = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const apiInteractor = new APIInteractor();
  const [errors, setErrors] = useState({
    isError: false,
    message: ''
  });
  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: '',
    newPassword1: '',
    newPassword2: '',
  });

  useEffect(() => {
    console.log(errors);
  });

  const onChangeInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPasswordInfo({ ...passwordInfo, [name]: value });
    setErrors({ ...errors, isError: false, message: '' });
  };

  const changePassword = async (e) => {
    e.preventDefault();
    await apiInteractor.changePassword({ ...passwordInfo, email: localStorage.getItem('email') })
    .then(() => navigate('/userPage'))
    .catch((data) => {
      setErrors({
        ...errors,
        isError: true,
        message: <FormattedMessage id={data} />,
      });
    });

  }

  return (
    <main>
      <article className="form">
        <div className="form__container" id="change-password-form">
          <form className="form__form">
            <div className="form__inputs-container">
              <Input
                label={<FormattedMessage id="changePassword.old.label" />}
                className="form__old-password form-input"
                placeholder={intl.formatMessage({ id: 'changePassword.old.placeholder' })}
                name="oldPassword"
                onChange={onChangeInfo}
                type="password"
              />
              <Input
                label={<FormattedMessage id="changePassword.new.label" />}
                className="form__new-password1 form-input"
                placeholder={intl.formatMessage({ id: 'changePassword.new.placeholder' })}
                name="newPassword1"
                onChange={onChangeInfo}
                type="password"
              />
              <Input
                label={<FormattedMessage id="changePassword.new2.label" />}
                className="form__new-password2 form-input"
                placeholder={intl.formatMessage({ id: 'changePassword.new2.placeholder' })}
                name="newPassword2"
                onChange={onChangeInfo}
                type="password"
              />
              <Button
                className="form__confirm form-button button"
                type="submit"
                onClick={changePassword}
                text={<FormattedMessage id="changePassword.button.change" />}
              />
              {
                errors.isError && <p className="form__error error">{errors.message}</p>
              }
            </div>
          </form>
        </div>
      </article>
    </main>
  );
};
