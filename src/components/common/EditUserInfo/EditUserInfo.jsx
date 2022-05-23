import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Button } from "../Button";
import { Close } from "../Close";
import { Input } from "../Input";

import { formatForDatePickerValue, validateEmail, validateField,validateIsFutureDate, validatePhoneNumber } from "../../../services/utils";
import { APIInteractor } from "../../../services";

import './EditUserInfo.scss';

export const EditUserInfo = ({ onClose, user, onSubmit }) => {
  const intl = useIntl();
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
      setError({ isError: true, message: <FormattedMessage id="editUserInfo.error.firstName" /> });
      return false;
    }
    if(!validateField(userInfo.lastName)) {
      setError({ isError: true, message: <FormattedMessage id="editUserInfo.error.lastName" /> });
      return false;
    }
    if(!validateField(userInfo.fatherName)) {
      setError({ isError: true, message: <FormattedMessage id="editUserInfo.error.fatherName" /> });
      return false;
    }
    if(!validateIsFutureDate(userInfo.dateOfBirth)) {
      setError({ isError: true, message: <FormattedMessage id="editUserInfo.error.birthDate" /> });
      return false;
    }
    if(!validatePhoneNumber(userInfo.phoneNumber)) {
      setError({ isError: true, message: <FormattedMessage id="editUserInfo.error.phoneNumber" /> });
      return false;
    }
    if(!validateEmail(userInfo.email)) {
      setError({ isError: true, message: <FormattedMessage id="editUserInfo.error.email" /> });
      return false;
    }
    return true;
  };

  return (
    <form className="edit-user" method="POST">
      <div className="edit-user__heading-container">
        <div className="edit-user__heading">
          <h2 className="edit-user-title">
            <FormattedMessage id="editUserInfo.title" />
          </h2>
        </div>
        <div className="edit-user__line"></div>
        <div className="edit-user__errors">
          { error.isError && <p className="edit-user__error-message error">{error.message}</p> }
        </div>
        <div className="edit-user__inputs">
          <div className="edit-user__left">
            <Input
              placeholder={intl.formatMessage({ id: 'editUserInfo.firstName.placeholder' })}
              className="edit-user__firstname form-input"
              onChange={onChangeInfo}
              name="firstName"
              label={<FormattedMessage id="editUserInfo.firstName.label" />}
              value={userInfo.firstName}
              required
            />
            <Input
              placeholder={intl.formatMessage({ id: 'editUserInfo.lastName.placeholder' })}
              className="edit-user__lastname form-input"
              onChange={onChangeInfo}
              name="lastName"
              label={<FormattedMessage id="editUserInfo.lastName.label" />}
              value={userInfo.lastName}
            />
            <Input
              placeholder={intl.formatMessage({ id: 'editUserInfo.fatherName.placeholder' })}
              className="edit-user__fathername form-input"
              onChange={onChangeInfo}
              name="fatherName"
              label={<FormattedMessage id="editUserInfo.fatherName.label" />}
              value={userInfo.fatherName}
            />
          </div>
          <div className="edit-user__right">
            <Input
              placeholder={intl.formatMessage({ id: 'editUserInfo.birthDate.placeholder' })}
              className="edit-user__dateOfBirth form-input"
              onChange={onChangeInfo}
              name="dateOfBirth"
              label={<FormattedMessage id="editUserInfo.birthDate.label" />}
              type="date"
              value={userInfo.dateOfBirth}
              required
            />
            <Input
              placeholder={intl.formatMessage({ id: 'editUserInfo.phoneNumber.placeholder' })}
              className="edit-user__phoneNumber form-input"
              onChange={onChangeInfo}
              name="phoneNumber"
              label={<FormattedMessage id="editUserInfo.phoneNumber.label" />}
              value={userInfo.phoneNumber}
              required
            />
            <Input
              placeholder={intl.formatMessage({ id: 'editUserInfo.email.placeholder' })}
              className="edit-user__email form-input"
              onChange={onChangeInfo}
              name="email"
              label={<FormattedMessage id="editUserInfo.email.label" />}
              value={userInfo.email}
              required
            />
          </div>
        </div>
        <div className="edit-user__submit">
          <Button
            text={<FormattedMessage id="editUserInfo.button.update" />}
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
