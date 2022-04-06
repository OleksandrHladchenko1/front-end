import React, { Component } from "react";

import { ChangeVisitStatus } from "../../common/ChangeVisitStatus";

import { APIInteractor } from "../../../services";
import { concatFullName, formatDate, formatTime } from "../../../services/utils";

import './VisitDetails.scss';

export class VisitDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      visit: {},
      issues: [],
    };

    this.apiInteractor = new APIInteractor();
  }

  componentDidMount = async () => {
    Promise.all([
      this.apiInteractor.getVisitById(localStorage.getItem('visitId')),
      this.apiInteractor.getIssuesByVisitId(localStorage.getItem('visitId')),
    ]).then((data) => {
      const firstPromise = data[0].data.visit[0];
      const userInfo = {
        discount: `${firstPromise.discount}%`,
        fullName: concatFullName(firstPromise.firstName, firstPromise.lastName, firstPromise.fatherName),
        email: firstPromise.email,
        phoneNumber: firstPromise.phoneNumber,
      };
      const visitInfo = {
        dateOfVisit: `${formatDate(firstPromise.dateOfVisit)} ${formatTime(firstPromise.dateOfVisit)}`,
        status: firstPromise.status
      };
      this.setState({
        ...this.state,
        user: { ...userInfo },
        visit: { ...visitInfo },
        issues: [...data[1].data.issues],
      });
    })
  }
  changeVisitStatus = (status) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        visit: { ...prevState.visit, status }
      };
    });
  }

  render() {
    const {
      fullName,
      discount,
      email,
      phoneNumber
    } = this.state.user;
    const {
      dateOfVisit,
      status,
    } = this.state.visit
    return (
      <main>
        <article className="visit-detail">
          <div className="visit-detail__container">
            <div className="visit-detail__user-info">
              <div className="visit-detail__user-info-heading">
                <h2 className="visit-detail__user-info-heading-text">User Info</h2>
              </div>
              <div className="visit-detail__user-info-main">
                <div className="visit-detail__left">
                  <div className="visit-detail__fullname-container">
                    <p className="visit-detail__fullname strong">Full name</p>
                    <span className="visit-detail__fullname-text main-info">{fullName}</span>
                  </div>
                  <div className="visit-detail__discount-container">
                    <p className="visit-detail__discount strong">Discount</p>
                    <span className="visit-detail__discount-text main-info">{discount}</span>
                  </div>
                </div>
                <div className="visit-detail__right">
                  <div className="visit-detail__email-container">
                    <p className="visit-detail__email strong">E-mail</p>
                    <span className="visit-detail__email-text main-info">{email}</span>
                  </div>
                  <div className="visit-detail__phoneNumber-container">
                    <p className="visit-detail__phoneNumber strong">Phone number</p>
                    <span className="visit-detail__phoneNumber-text main-info">{phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="visit-detail__visit-info">
              <div className="visit-detail__user-info-heading">
                <h2 className="visit-detail__user-info-heading-text">Visit Information</h2>
              </div>
              <div className="visit-detail__user-info-main">
                <div className="visit-detail__left">
                  <div className="visit-detail__visit-date-container">
                    <p className="visit-detail__visit-date strong">Visit date</p>
                    <span className="visit-detail__visit-date-text main-info">{dateOfVisit}</span>
                  </div>
                </div>
                <div className="visit-detail__right">
                  <div className="visit-detail__status-container">
                    <p className="visit-detail__status strong">Status</p>
                    <ChangeVisitStatus currentStatus={status} onChange={this.changeVisitStatus} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    );
  }
};
