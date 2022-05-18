import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { getLastElement } from "../../../services/utils";

import './StartPage.scss';

export const StartPage = () => {
  const setStartStatus = (e) => {
    localStorage.setItem('startStatus', getLastElement(e.target.classList));
  };

  return (
    <main>
      <article className="start">
        <div className="start__container">
          <ul className="start__links">
            <li className="start__list-item">
              <Link
                className="start__link-user start-link User"
                to="/login"
                onClick={setStartStatus}
              >
                <FormattedMessage id="startPage.user" />
              </Link>
            </li>
            <li className="start__list-item">
              <Link
                className="start__link-worker start-link Worker"
                to="/login"
                onClick={setStartStatus}
              >
                <FormattedMessage id="startPage.worker" />
              </Link>
            </li>
            <li className="start__list-item">
              <Link
                className="start__link-admin start-link Admin"
                to="/login"
                onClick={setStartStatus}
              >
                <FormattedMessage id="startPage.admin" />
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
};
