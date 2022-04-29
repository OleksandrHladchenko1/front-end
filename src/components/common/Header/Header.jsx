import React from "react";
import { Link } from "react-router-dom";

import { Logo } from "../Logo";

import logo from '../../../assets/logo.svg';

import './Header.scss';

export const Header = () => {
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
                  Visits
                </Link>
              </li>
              { localStorage.getItem('startStatus') === "User" &&
                <>
                  <li className="header__link">
                    <Link className="header__user-page" to="/userPage">
                      My Profile
                    </Link>
                  </li>
                  <li className="header__link">
                    <Link className="header__user-cars" to="/my-cars">
                      My Cars
                    </Link>
                  </li>
                </>
              }
              <li className="header__link">
                <Link className="header__logout" to="/" onClick={logout}>
                  Logout
                </Link>
              </li>
              
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
