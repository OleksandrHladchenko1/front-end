import React, { Component } from "react";
import { Link } from "react-router-dom";

import { NoValue } from '../../common/NoValue';
import { Button } from '../../common/Button';

import { APIInteractor } from "../../../services";
import { formatDate } from "../../../services/utils";

import './UserPage.scss';

export class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = { user: {} }
  }

  apiInteractor = new APIInteractor();

  componentDidMount = async () => {
    const result = await this.apiInteractor.getUserById(localStorage.getItem('userId'));
    this.setState({ user: result });
  }

  addCarInfo() {
    console.log('a');
  }

  render() {
    const {
      discount,
      dateOfBirth,
      firstName,
      lastName,
      fatherName,
      phoneNumber,
      email,
    } = this.state.user;

    const changePasswordButton = (
      <Link className='user__change-password success button' to='/changePassword'>
        Change Password
      </Link>
    );

    const addCarButton = (
      <Link className='user__change-password success button' to='/changePassword'>
        Add car
      </Link>
    );

    return (
      <main>
        <article className="user">
          <div className="user__background">
            <div className="user__image-container">
              <div className="user__image-inner-container">
                <div className="user__image"></div>
              </div>
            </div>
          </div>
          <div className="user__info-container">
            <div className="user__info">
              <div className="user__header-info">
                <div className="user__bonuses">
                  <h2 className="user__bonuses-title">Bonuses</h2>
                  <h3 className="user__bonuses-amount">{discount} %</h3>
                </div>
                <div className="user__birthday">
                  <h2 className="user__birthday-title">Birthday</h2>
                  <h3 className="user__birthday-amount">{formatDate(dateOfBirth) || <NoValue />}</h3>
                </div>
              </div>
              <div className="user__main-info">
                <div className="user__fullname">
                  { firstName && <span className="user_firstName fio">{firstName} </span> } 
                  { lastName && <span className="user_lastName fio">{lastName} </span> }
                  { fatherName && <span className="user_fatherName fio">{fatherName}</span> }
                </div>
              </div>
              <div className="user__contacts">
                <h2 className="user__contacts-heading">Contact info</h2>
                <div className="user__email-phone">
                  <div className="user__phone-container">
                    <h3 className="user__phone-text">Phone</h3>
                    <h4 className="user__phone">{phoneNumber}</h4>
                  </div>
                  <div className="user__email-container">
                    <h3 className="user__email-text">E-mail</h3>
                    <h4 className="user__email">{email}</h4>
                  </div>
                </div>
              </div>
              <div className="user__button-group">
                <Button text={changePasswordButton} className="user__change-password success button" />
                <Button text={addCarButton} onClick={this.addCarInfo} className="user__add-car success button" />
              </div>
            </div>
          </div>
        </article>
      </main>
    );
  }
}
