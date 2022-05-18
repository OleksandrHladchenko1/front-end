import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import { Logo } from "../Logo";
import { Button } from "../Button";
import { Context } from "../Wrapper";

import logo from '../../../assets/logo.svg';

import './Header.scss';

export const Header = () => {
  const context = useContext(Context);

  const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-container">
          <Logo src={logo} alt="logo" />
          <h1 className="header__logo-text">CTO</h1>
        </div>
        <div className="header__navidation-container">
          <nav className="header__navidation">
            <ul className="header__link-container">
              <li className="header__link">
                <Link className="header__visits" to="/visits">
                  <FormattedMessage id="header.visits" />
                </Link>
              </li>
              {
                localStorage.getItem('startStatus') === "Admin" &&
                <>
                  <li className="header__link">
                    <Link className="header__visits" to="/admin">
                      <FormattedMessage id="header.adminPage" />
                    </Link>
                  </li>
                  <li className="header__link">
                    <Link className="header__visits" to="/statistics">
                      <FormattedMessage id="header.statistics" />
                    </Link>
                  </li>
                </>
              }
              { localStorage.getItem('startStatus') === "User" &&
                <>
                  <li className="header__link">
                    <Link className="header__user-page" to="/userPage">
                      <FormattedMessage id="header.myProfile" />
                    </Link>
                  </li>
                  <li className="header__link">
                    <Link className="header__user-cars" to="/my-cars">
                      <FormattedMessage id="header.myCars" />
                    </Link>
                  </li>
                </>
              }
              <li className="header__link">
                <Button
                  text="UA"
                  onClick={(e) => {
                    localStorage.setItem('language', e.target.value);
                    context.selectLang(e);
                  }}
                  value="uk"
                  className="change-lang ua"
                />
                <Button
                  text="EN"
                  onClick={(e) => {
                    localStorage.setItem('language', e.target.value);
                    context.selectLang(e);
                  }}
                  value="en-US"
                  className="change-lang en"
                />
              </li>
              <li className="header__link">
                <Link className="header__logout" to="/" onClick={logout}>
                  <FormattedMessage id="header.logout" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
