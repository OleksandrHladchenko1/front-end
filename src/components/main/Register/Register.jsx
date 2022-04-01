import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

import { APIInteractor } from "../../../services";
import { registerErrors, validateEmail, validateField, validatePassword, validatePhoneNumber } from "../../../services/utils";

import './Register.scss';

export const Register = () => {
  const navigate = useNavigate();
  const apiInteractor = new APIInteractor();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    firstName: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState(registerErrors);

  useEffect(() => {
    console.log(userInfo);
    console.log(errors);
  });

  const onChangeInfo = (e) => {
    setErrors(registerErrors);
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const register = (e) => {
    e.preventDefault();
    const {
      email,
      firstName,
      phoneNumber,
      password,
    } = userInfo;

    if(validatePassword(password) && validatePhoneNumber(phoneNumber) && validateField(firstName) && validateEmail(email)) {
      apiInteractor.register(userInfo).then(() => {
        navigate('/login');
      });
    } else {
      if(!validateEmail(email)) {
        setErrors((prevState) => ({
          ...prevState,
          email: { ...prevState.email, error: true }
        }));
      }
  
      if(!validateField(firstName)) {
        setErrors((prevState) => ({
          ...prevState,
          firstName: { ...prevState.firstName, error: true }
        }));
      }
  
      if(!validatePhoneNumber(phoneNumber)) {
        setErrors((prevState) => ({
          ...prevState,
          phoneNumber: { ...prevState.phoneNumber, error: true }
        }));
      } 
  
      if(!validatePassword(password)) {
        setErrors((prevState) => ({
          ...prevState,
          password: { ...prevState.password, error: true }
        }));
      }
    }
  };

  return (
    <main>
      <article className="form">
        <div className="form__container">
          <form className="form__form" method="POST">
            <div className="form__form-container" id="register">
              <div className="form__inputs-container">
                <Input
                  className="form__email form-input"
                  placeholder="Enter your email"
                  name="email"
                  onChange={onChangeInfo}
                  label="Email"
                />
                {errors.email.error &&
                  <p className="form__email-error error">{errors.email.message}</p>
                }
                <Input
                  className="form__first-name form-input"
                  placeholder="Enter your firstname"
                  name="firstName"
                  onChange={onChangeInfo}
                  label="First Name"
                />
                {errors.firstName.error &&
                  <p className="form__first-name-error error">{errors.firstName.message}</p>
                }
                <Input
                  className="form__phone-number form-input"
                  placeholder="Enter your phone number"
                  name="phoneNumber"
                  onChange={onChangeInfo}
                  label="Phone Number"
                />
                {errors.phoneNumber.error &&
                  <p className="form__phone-number-error error">{errors.phoneNumber.message}</p>
                }
                <Input
                  className="form__password form-input"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={onChangeInfo}
                  label="Password"  
                />
                {errors.password.error &&
                  <p className="form__password-error error">{errors.password.message}</p>
                }
                <Button className="form__submit form-button button" type="submit" onClick={register} text="Register" />
              </div>
              <div className="form__regirect">
                <p className="form__redirect-text">
                  If you don`t have an account you can{' '}
                  <Link className='form__link' to='/login'>
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </article>
    </main>
  );
};
