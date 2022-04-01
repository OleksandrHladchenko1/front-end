import React, { useEffect, useState } from "react";

import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

import { APIInteractor } from "../../../services";

import './ChangePassword.scss';
import { validatePassword } from "../../../services/utils";
import { useNavigate } from "react-router";

export const ChangePassword = () => {
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
    if(validatePassword(passwordInfo.newPassword1) && validatePassword(passwordInfo.newPassword2)) {
      await apiInteractor.changePassword({ ...passwordInfo, email: localStorage.getItem('email') })
      .then(() => navigate('/userPage'))
      .catch((data) => {
        setErrors({
          ...errors,
          isError: true,
          message: data,
        });
      });
    } else {
      setErrors({
        ...errors,
        isError: true,
        message: 'Empty password or shorter than 6 symbols',
      });
    }
  }

  return (
    <main>
      <article className="form">
        <div className="form__container">
          <form className="form__form">
            <div className="form__inputs-container">
              <Input
                className="form__old-password form-input"
                placeholder="Enter old password"
                name="oldPassword"
                onChange={onChangeInfo}
                type="password"
              />
              <Input
                className="form__new-password1 form-input"
                placeholder="Enter new password"
                name="newPassword1"
                onChange={onChangeInfo}
                type="password"
              />
              <Input
                className="form__new-password2 form-input"
                placeholder="Repeat new password"
                name="newPassword2"
                onChange={onChangeInfo}
                type="password"
              />
              <Button
                className="form__confirm form-button button"
                type="submit"
                onClick={changePassword}
                text="Change Password"
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
