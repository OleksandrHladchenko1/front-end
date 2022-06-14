import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { NoValue } from '../../common/NoValue';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { EditUserInfo } from "../../common/EditUserInfo";

import { APIInteractor } from "../../../services";
import { formatBirthDate } from "../../../services/utils";

import './UserPage.scss';

export class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isModalOpen: false,
    };
  }

  apiInteractor = new APIInteractor();

  getUserById = async () => {
    const result = await this.apiInteractor.getUserById(localStorage.getItem('userId'));
    return result;
  }

  componentDidMount = async () => {
    this.getUserById().then((result) => {
      this.setState({ user: result });
    });
  }

  showEditModal = () => {
    this.setState({ isModalOpen: true });
  }

  hideEditModal = () => {
    this.setState({ isModalOpen: false });
  }

  onSubmitEditInfo = () => {
    this.getUserById().then((result) => {
      this.setState({ user: result })
    });
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
      <Link className='user__change-password link' to='/changePassword'>
        <FormattedMessage id="userPage.changePasswordButton" />
      </Link>
    );

    const addCarButton = (
      <Link className='user__change-password link' to='/car'>
        <FormattedMessage id="userPage.addCarButton" />
      </Link>
    );

    return (
      <main>
        <Modal isModalOpen={this.state.isModalOpen}>
          <EditUserInfo
            onClose={this.hideEditModal}
            user={this.state.user}
            onSubmit={this.onSubmitEditInfo}
          />
        </Modal>
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
                  <h2 className="user__bonuses-title"><FormattedMessage id="userPage.bonuses" /></h2>
                  <h3 className="user__bonuses-amount">{discount} %</h3>
                </div>
                <div className="user__birthday">
                  <h2 className="user__birthday-title"><FormattedMessage id="userPage.birthday" /></h2>
                  <h3 className="user__birthday-amount">{formatBirthDate(dateOfBirth) || <NoValue />}</h3>
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
                <h2 className="user__contacts-heading">
                  <FormattedMessage id="userPage.contactInfo" />
                </h2>
                <div className="user__email-phone">
                  <div className="user__phone-container">
                    <h3 className="user__phone-text"><FormattedMessage id="userPage.phoneNumber" /></h3>
                    <h4 className="user__phone">{phoneNumber}</h4>
                  </div>
                  <div className="user__email-container">
                    <h3 className="user__email-text"><FormattedMessage id="userPage.email" /></h3>
                    <h4 className="user__email">{email}</h4>
                  </div>
                </div>
              </div>
              <div className="user__button-group">
                <Button
                  text={changePasswordButton}
                  className="user__change-password success button users-buttons"
                />
                <Button
                  text={addCarButton}
                  className="user__add-car success button users-buttons"
                />
                <Button
                  text={<FormattedMessage id="userPage.editInfoButton" />}
                  onClick={this.showEditModal}
                  className="user__add-car success button users-buttons"
                />
              </div>
            </div>
          </div>
        </article>
      </main>
    );
  }
}
