import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

import { APIInteractor } from "../../../services";
import { setItemToLS, validateEmail, validatePassword } from "../../../services/utils";

import './Login.scss';
import { FormattedMessage, injectIntl, } from "react-intl";

const Login = ({ intl }) => {
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
        startStatus === 'User' ? navigate('/userPage') : navigate('/visits');
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
        <div className="form__container" id="login">
          <form className="form__form" method="POST">
            <div className="form__form-container">
              <div className="form__inputs-container login">
                <Input
                  className="form__email form-input"
                  placeholder={intl.formatMessage({ id: "login.email.placeholder" })}
                  name="email" onChange={onChangeInfo}
                  label={<FormattedMessage id="login.email.label" />}
                />
                <Input
                  className="form__password form-input"
                  type="password"
                  placeholder={intl.formatMessage({ id: "login.password.placeholder" })}
                  name="password"
                  onChange={onChangeInfo}
                  label={<FormattedMessage id="login.password.label" />}
                />
                <Button
                  className="form__submit form-button button"
                  type="submit"
                  onClick={login}
                  text={<FormattedMessage id="login.button" />}
                />
              </div>
              <div className="form__error">
                {emailError && 
                  <p className="form__email-error error">{<FormattedMessage id="login.error" />}</p>
                }
              </div>
              {
                startStatus === 'User' &&
                <div className="form__regirect">
                  <p className="form__redirect-text">
                  {<FormattedMessage id="login.dontHaveAccount" />}{' '}
                    <Link className='form__link' to='/register'>
                      <FormattedMessage id="login.gotoRegister" />
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

export default injectIntl(Login);
