import React, { Component } from "react";

import { ChangeVisitStatus } from "../../common/ChangeVisitStatus";
import { NewVisitEdit } from "../../common/NewVisitEdit";

import { APIInteractor } from "../../../services";
import { concatFullName, formatDate, formatTime } from "../../../services/utils";
import plus from '../../../assets/plus.svg';

import './VisitDetails.scss';
import { Button } from "../../common/Button";

export class VisitDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      visit: {},
      issues: [],
      workers: [],
      isNewVisitVisible: true,
    };

    this.apiInteractor = new APIInteractor();
    this.addLogo = (
      <img src={plus} alt="plus" />
    );
  }

  setStateForUserAndvisit = (result) => {
    const userInfo = {
      discount: `${result.discount}%`,
      fullName: concatFullName(result.firstName, result.lastName, result.fatherName),
      email: result.email,
      phoneNumber: result.phoneNumber,
    };
    const visitInfo = {
      dateOfVisit: `${formatDate(result.dateOfVisit)} ${formatTime(result.dateOfVisit)}`,
      status: result.status
    };
    this.setState({
      ...this.state,
      user: { ...userInfo },
      visit: { ...visitInfo },
    });
  }

  getDataForPlannedVisit = async () => {
    return Promise.all([
      this.apiInteractor.getVisitById(localStorage.getItem('visitId'))
    ]);
  }

  getDataForInProgressVisit = async () => {
    return Promise.all([
      this.apiInteractor.getVisitById(localStorage.getItem('visitId')),
      this.apiInteractor.getIssuesByVisitId(localStorage.getItem('visitId'), localStorage.getItem('visitStatus')),
      this.apiInteractor.getFullFreeWorkersInfo(),
    ]);
  }

  getDataAfterUpdate = async () => {
    if(localStorage.getItem('visitStatus') === 'Planned') {
      this.getDataForPlannedVisit().then((data) => {
        this.setStateForUserAndvisit(data[0].data.visit[0]);
      });
    } else if(localStorage.getItem('visitStatus') === 'In Progress') {
      this.getDataForInProgressVisit().then((data) => {
        this.setStateForUserAndvisit(data[0].data.visit[0]);
        this.setState({
          ...this.state,
          issues: [...data[1].data.issues],
          workers: [...data[2]],
        });
      });
    }
  }

  componentDidMount = async () => {
    this.getDataAfterUpdate();
  }

  changeVisitStatus = (status) => {
    this.apiInteractor.changeVisitStatus(localStorage.getItem('visitId'), status);
    this.setState((prevState) => {
      return {
        ...prevState,
        visit: { ...prevState.visit, status }
      };
    });
  }

  showNewIssue = () => {
    this.setState({ isNewVisitVisible: true })
  }

  submitCreateIssue = (issue) => {
    console.log(issue);
    const specialist = {
      isBusy: 'Yes',
      startTime: issue.startTime,
      endTime: issue.endTime,
      id: issue.specialistId,
    };
    const newIssue = {
      visitId: localStorage.getItem('visitId'),
      specialistId: issue.specialistId,
      description: issue.description,
      startTime: issue.startTime,
      endTime: issue.endTime,
      price: issue.price,
    };
    console.log(newIssue)
    this.apiInteractor.addIssue(newIssue).then(() => {
      this.apiInteractor.editSpecialistInfo(specialist).then(() => {
        this.setState((prevState) => {
          return {
            ...prevState,
            issues: [...prevState.issues, issue],
            isNewVisitVisible: false,
          };
        });
        this.getDataAfterUpdate();
      });
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
                <h2 className="visit-detail__user-info-heading-text">User Information</h2>
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
            <div className="visit-detail__user-info-heading">
                <h2 className="visit-detail__user-info-heading-text">Issues Information</h2>
              </div>
            { status === "Planned" &&
              <div className="visit-detail__change-please">
                <p className="visit-detail__change-please-text">Please, change status to "In Progress" to add issues</p>
              </div>
            }
            { status === "In Progress" &&
              <>
                { !this.state.isNewVisitVisible &&
                  <Button
                    text={this.addLogo}
                    className="visit-detail__show-new-issue"
                    onClick={this.showNewIssue}
                  />
                }
                <div className="visit-detail__add-issue">
                  <NewVisitEdit workers={this.state.workers} visible={this.state.isNewVisitVisible} onSubmit={this.submitCreateIssue} />
                </div>
                {!!this.state.issues.length  &&
                  <div className="visit-detail__issues-info">{JSON.stringify(this.state.issues)}</div> 
                }
              </>
            }
          </div>
        </article>
      </main>
    );
  }
};
