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
      <article className="register">
        <div className="register__container">
          <form className="register__form" method="POST">
            <div className="register__form-container">
              <div className="register__inputs-container">
                <Input className="register__email form-input" placaholder="Enter your email" name="email" onChange={onChangeInfo} />
                {errors.email.error &&
                  <p className="register__email-error error">{errors.email.message}</p>
                }
                <Input className="register__first-name form-input" placaholder="Enter your firstname" name="firstName" onChange={onChangeInfo} />
                {errors.firstName.error &&
                  <p className="register__first-name-error error">{errors.firstName.message}</p>
                }
                <Input className="register__phone-number form-input" placaholder="Enter your phone number" name="phoneNumber" onChange={onChangeInfo} />
                {errors.phoneNumber.error &&
                  <p className="register__phone-number-error error">{errors.phoneNumber.message}</p>
                }
                <Input className="register__password form-input" type="password" placaholder="Enter your password" name="password" onChange={onChangeInfo} />
                {errors.password.error &&
                  <p className="register__password-error error">{errors.password.message}</p>
                }
                <Button className="register__submit form-button" type="submit" onClick={register} text="Register" />
              </div>
              <div className="register__regirect">
                <p className="register__redirect-text">
                  If you don`t have an account you can{' '}
                  <Link className='register__link' to='/login'>
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
