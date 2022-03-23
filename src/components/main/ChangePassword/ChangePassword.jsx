import React, { useEffect, useState } from "react";

import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

import { APIInteractor } from "../../../services";

import './ChangePassword.scss';

export const ChangePassword = () => {
  const apiInteractor = new APIInteractor();
  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: '',
    newPassword1: '',
    newPassword2: '',
  });

  useEffect(() => {
    console.log(passwordInfo);
  });

  const onChangeInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPasswordInfo({ ...passwordInfo, [name]: value });
  };

  const changePassword = (e) => {
    e.preventDefault();
    apiInteractor.changePassword({ ...passwordInfo, email: localStorage.getItem('email') });
  }

  return (
    <main>
      <article className="form">
        <div className="form__container">
          <form className="form__form">
            <div className="form__inputs-container">
              <Input
                className="form__old-password form-input"
                placaholder="Enter old password"
                name="oldPassword"
                onChange={onChangeInfo}
                type="password"
              />
              <Input
                className="form__new-password1 form-input"
                placaholder="Enter new password"
                name="newPassword1"
                onChange={onChangeInfo}
                type="password"
              />
              <Input
                className="form__new-password2 form-input"
                placaholder="Repeat new password"
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
            </div>
          </form>
        </div>
      </article>
    </main>
  );
};
