import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

import { APIInteractor } from "../../../services";
import { setItemToLS, validateEmail, validatePassword } from "../../../services/utils";

import './Login.scss';

export const Login = () => {
  const startStatus = localStorage.getItem('startStatus');
  const navigate = useNavigate();
  const apiInteractor = new APIInteractor();
  const [emailError, setEmailError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    console.log(userInfo);
  });

  const selectBackground = () => {
    switch(startStatus) {
      case 'User':
        return 'user-bg';
      case 'Worker': 
        return 'worker-bg';
      case 'Admin':
        return 'admin-bg';
      default: return;
    }
  };

  const login = (e) => {
    e.preventDefault();
    if(validateEmail(userInfo.email) && validatePassword(userInfo.password)) {
      setEmailError(false);
      apiInteractor.login({ ...userInfo, startStatus }).then(result => {
        setItemToLS('token', result.token);
        setItemToLS('userId', result.user.idUser);
        if(startStatus === 'User') {
          navigate('/userPage');
        } else {
          console.log('worker');
        }
      });
    } else {
      setEmailError(true);
    }
  };

  const onChangeInfo = (e) => {
    setEmailError(false);
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <main>
      <article className={`form ${selectBackground()}`}>
        <div className="form__container">
          <form className="form__form" method="POST">
            <div className="form__form-container">
              <div className="form__inputs-container login">
                <Input
                  className="form__email form-input"
                  placeholder="Enter your email"
                  name="email" onChange={onChangeInfo}
                  label="Email"
                />
                <Input
                  className="form__password form-input"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={onChangeInfo}
                  label="Password"
                />
                <Button className="form__submit form-button button" type="submit" onClick={login} text="Login" />
              </div>
              <div className="form__error">
                {emailError && 
                  <p className="form__email-error error">Wrong email or password!</p>
                }
              </div>
              {
                startStatus === 'User' &&
                <div className="form__regirect">
                  <p className="form__redirect-text">
                    If you don`t have an account you can{' '}
                    <Link className='form__link' to='/register'>
                      Register
                    </Link>
                  </p>
                </div>
              }
            </div>
          </form>
        </div>
      </article>
    </main>
  );
};
