import React, { useEffect, useState } from "react";

import { Button } from "../Button";
import { Close } from "../Close";
import { Input } from "../Input";

import { formatForDatePickerValue, validateEmail, validateField,validateIsFutureDate, validatePhoneNumber } from "../../../services/utils";
import { APIInteractor } from "../../../services";

import './EditUserInfo.scss';

export const EditUserInfo = ({ onClose, user, onSubmit }) => {
  const apiInteractor = new APIInteractor();
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [userInfo, setUserInfo] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    fatherName: user.fatherName || '',
    phoneNumber: user.phoneNumber || '',
    dateOfBirth: formatForDatePickerValue(user.dateOfBirth) || '',
    email: user.email || '',
  });

  useEffect(() => {
    console.log(userInfo);
  });

  const onChangeInfo = (e) => {
    setError({ ...error, isError: false });
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if(validateUserInfo()) {
      apiInteractor.updateUserInfo({ ...userInfo, id: localStorage.getItem('userId') }).then(() => {
        onClose();
        onSubmit();
      });
    }
  };

  const validateUserInfo = () => {
    if(!validateField(userInfo.firstName)) {
      setError({ isError: true, message: 'First name must be more than 3 symbols' });
      return false;
    }
    if(!validateIsFutureDate(userInfo.dateOfBirth)) {
      setError({ isError: true, message: 'Please, choose a correct date' });
      return false;
    }
    if(!validatePhoneNumber(userInfo.phoneNumber)) {
      setError({ isError: true, message: 'Wrong phone number format' });
      return false;
    }
    if(!validateEmail(userInfo.email)) {
      setError({ isError: true, message: 'Wrong e-mail format' });
      return false;
    }
    return true;
  };

  return (
    <form className="edit-user" method="POST">
      <div className="edit-user__heading-container">
        <div className="edit-user__heading">
          <h2 className="edit-user-title">Edit information about yourself</h2>
        </div>
        <div className="edit-user__line"></div>
        <div className="edit-user__errors">
          { error.isError && <p className="edit-user__error-message error">{error.message}</p> }
        </div>
        <div className="edit-user__inputs">
          <div className="edit-user__left">
            <Input
              placeholder="First name"
              className="edit-user__firstname form-input"
              onChange={onChangeInfo}
              name="firstName"
              label="First name"
              value={userInfo.firstName}
              required
            />
            <Input
              placeholder="Last name"
              className="edit-user__lastname form-input"
              onChange={onChangeInfo}
              name="lastName"
              label="Last name"
              value={userInfo.lastName}
            />
            <Input
              placeholder="Father name"
              className="edit-user__fathername form-input"
              onChange={onChangeInfo}
              name="fatherName"
              label="Father name"
              value={userInfo.fatherName}
            />
          </div>
          <div className="edit-user__right">
            <Input
              placeholder="Birth date"
              className="edit-user__dateOfBirth form-input"
              onChange={onChangeInfo}
              name="dateOfBirth"
              label="Birth date"
              type="date"
              value={userInfo.dateOfBirth}
              required
            />
            <Input
              placeholder="Phone number"
              className="edit-user__phoneNumber form-input"
              onChange={onChangeInfo}
              name="phoneNumber"
              label="Phone number"
              value={userInfo.phoneNumber}
              required
            />
            <Input
              placeholder="Email"
              className="edit-user__email form-input"
              onChange={onChangeInfo}
              name="email"
              label="Email"
              value={userInfo.email}
              required
            />
          </div>
        </div>
        <div className="edit-user__submit">
          <Button
            text="Update"
            onClick={submitForm}
            type="submit"
            className="eidt-user__submit-button success button users-buttons"
          />
        </div>
      </div>
      <Close onClick={onClose} />
    </form>
  );
};
