import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { saveAs } from 'file-saver';

import { ChangeVisitStatus } from '../../common/ChangeVisitStatus';
import { NewVisitEdit } from '../../common/NewVisitEdit';
import { Button } from '../../common/Button';
import { IssueItem } from '../../common/IssueItem';

import { APIInteractor } from '../../../services';
import { concatFullName, formatDate, formatTime } from '../../../services/utils';
import plus from '../../../assets/plus.svg';

import './VisitDetails.scss';

export class VisitDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: {},
      user: {},
      visit: {},
      issues: [],
      isNewVisitVisible: true,
      status: localStorage.getItem('visitStatus'),
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
      status: result.status,
    };
    const carInfo = {
      name: `${result.name} ${result.model}`,
      carcas: result.carcas,
      color: result.color,
      year: result.year,
      number: result.number,
      engineNumber: result.engineNumber,
      transmission: result.transmission,
      engine: result.engine,
    };

    this.setState({
      ...this.state,
      user: { ...userInfo },
      visit: { ...visitInfo },
      car: { ...carInfo },
    });
  };

  getDataForPlannedVisit = async () => Promise.all([
      this.apiInteractor.getVisitById(localStorage.getItem('visitId'))
    ]);

  getDataForInProgressVisit = async () => Promise.all([
      this.apiInteractor.getVisitById(localStorage.getItem('visitId')),
      this.apiInteractor.getIssuesByVisitId(localStorage.getItem('visitId'), this.state.status),
    ]);

  getDataForClosedVisit = async () => Promise.all([
      this.apiInteractor.getVisitById(localStorage.getItem('visitId')),
      this.apiInteractor.getIssuesByVisitId(localStorage.getItem('visitId'), this.state.status),
    ]);

  getDataAfterUpdate = async () => {
    if (this.state.status === 'Planned') {
      this.getDataForPlannedVisit().then((data) => {
        this.setStateForUserAndvisit(data[0].data.visit[0]);
      });
    } else if (this.state.status === 'In Progress') {
      this.getDataForInProgressVisit().then((data) => {
        this.setStateForUserAndvisit(data[0].data.visit[0]);
        this.setState({
          ...this.state,
          issues: [...data[1].data.issues],
        });
      });
    } else {
      this.getDataForClosedVisit().then((data) => {
        this.setStateForUserAndvisit(data[0].data.visit[0]);
        this.setState({
          ...this.state,
          issues: [...data[1].data.issues],
        });
      });
    }
  };

  componentDidMount() {
    this.getDataAfterUpdate();
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.visit.status !== this.state.visit.status) {
      this.getDataAfterUpdate();
    }
  };

  changeVisitStatus = (status) => {
    this.setState((prevState) => ({
      ...prevState,
      visit: { ...prevState.visit, status }
    }));
    this.setState({ status });
    localStorage.setItem('visitStatus', status);
    this.apiInteractor.changeVisitStatus(localStorage.getItem('visitId'), status);
  };

  showNewIssue = () => {
    this.setState({ isNewVisitVisible: true });
  };

  submitCreateIssue = (issue) => {
    const newIssue = {
      visitId: localStorage.getItem('visitId'),
      specialistId: issue.specialistId,
      description: issue.description,
      startTime: issue.startTime,
      endTime: issue.endTime,
      price: issue.price,
      closed: issue.closed,
    };

    this.apiInteractor.addIssue(newIssue).then(() => {
      this.setState((prevState) => ({
          ...prevState,
          issues: [issue, ...prevState.issues],
          isNewVisitVisible: false,
        }));
      this.getDataAfterUpdate();
    });
  };

  deleteIssue = (id) => {
    this.apiInteractor.deleteIssue(id);
    this.setState((prevProps) => ({
        ...prevProps,
        issues: [...prevProps.issues.filter((issue) => issue.issueId !== id)],
      }));
  };

  getPDF = () => {
    this.apiInteractor.createPDF(JSON.stringify(this.state)).then(() => {
      this.apiInteractor.downloadPDF().then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `${this.state.visit.dateOfVisit}_${this.state.user.fullName}.pdf`);
      });
    });
  }

  render() {
    const {
      fullName,
      discount,
      email,
      phoneNumber,
    } = this.state.user;
    const { dateOfVisit } = this.state.visit;
    const { status }= this.state;
    const {
      name,
      carcas,
      color,
      year,
      engine,
      transmission,
      number,
      engineNumber,
    } = this.state.car;
    const issuesList = this.state.issues.map((issue, index) => (
        <IssueItem key={index} issue={issue} onDelete={this.deleteIssue} />
      ));

    return (
      <main>
        <article className="visit-detail">
          <div className="visit-detail__container">
            <div className="visit-detail__user-info">
              <div className="visit-detail__user-info-heading">
                <h2 className="visit-detail__user-info-heading-text">
                  <FormattedMessage id="visitDetails.userInfo" />
                </h2>
              </div>
              <div className="visit-detail__user-info-main">
                <div className="visit-detail__left">
                  <div className="visit-detail__fullname-container">
                    <p className="visit-detail__fullname strong">
                      <FormattedMessage id="visitDetails.userInfo.fullName" />
                    </p>
                    <span className="visit-detail__fullname-text main-info">{fullName}</span>
                  </div>
                  <div className="visit-detail__discount-container">
                    <p className="visit-detail__discount strong">
                      <FormattedMessage id="visitDetails.userInfo.discount" />
                    </p>
                    <span className="visit-detail__discount-text main-info">{discount}</span>
                  </div>
                </div>
                <div className="visit-detail__right">
                  <div className="visit-detail__email-container">
                    <p className="visit-detail__email strong">
                      <FormattedMessage id="visitDetails.userInfo.email" />
                    </p>
                    <span className="visit-detail__email-text main-info">{email}</span>
                  </div>
                  <div className="visit-detail__phoneNumber-container">
                    <p className="visit-detail__phoneNumber strong">
                      <FormattedMessage id="visitDetails.userInfo.phoneNumber" />
                    </p>
                    <span className="visit-detail__phoneNumber-text main-info">{phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="visit-detail__visit-info">
              <div className="visit-detail__user-info-heading">
                <h2 className="visit-detail__user-info-heading-text">
                  <FormattedMessage id="visitDetails.carInfo" />
                </h2>
              </div>
              <div className="visit-detail__user-info-main">
                <div className="visit-detail__left">
                  <div className="visit-detail__visit-date-container">
                    <p className="visit-detail__visit-date strong">
                      <FormattedMessage id="visitDetails.carInfo.name" />
                    </p>
                    <span className="visit-detail__visit-date-text main-info">{name}</span>
                  </div>
                  <div className="visit-detail__visit-date-container">
                    <p className="visit-detail__visit-date strong">
                      <FormattedMessage id="visitDetails.carInfo.year" />
                    </p>
                    <span className="visit-detail__visit-date-text main-info">{year}</span>
                  </div>
                  <div className="visit-detail__status-container">
                    <p className="visit-detail__status strong">
                      <FormattedMessage id="visitDetails.carInfo.transmission" />
                    </p>
                    <span className="visit-detail__visit-date-text main-info">{transmission}</span>
                  </div>
                  <div className="visit-detail__status-container">
                    <p className="visit-detail__status strong">
                      <FormattedMessage id="visitDetails.carInfo.carNumber" />
                    </p>
                    <span className="visit-detail__visit-date-text main-info">{number}</span>
                  </div>
                </div>
                <div className="visit-detail__right">
                  <div className="visit-detail__status-container">
                    <p className="visit-detail__status strong">
                      <FormattedMessage id="visitDetails.carInfo.carcas" />
                    </p>
                    <span className="visit-detail__visit-date-text main-info">{carcas}</span>
                  </div>
                  <div className="visit-detail__status-container">
                    <p className="visit-detail__status strong">
                      <FormattedMessage id="visitDetails.carInfo.color" />
                    </p>
                    <span className="visit-detail__visit-date-text main-info">{color}</span>
                  </div>
                  <div className="visit-detail__status-container">
                    <p className="visit-detail__status strong">
                      <FormattedMessage id="visitDetails.carInfo.engine" />
                    </p>
                    <span className="visit-detail__visit-date-text main-info">{engine}</span>
                  </div>
                  <div className="visit-detail__status-container">
                    <p className="visit-detail__status strong">
                      <FormattedMessage id="visitDetails.carInfo.engineNumber" />
                    </p>
                    <span className="visit-detail__visit-date-text main-info">{engineNumber}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="visit-detail__visit-info">
              <div className="visit-detail__user-info-heading">
                <h2 className="visit-detail__user-info-heading-text">
                  <FormattedMessage id="visitDetails.visitInfo" />
                </h2>
              </div>
              <div className="visit-detail__user-info-main">
                <div className="visit-detail__left">
                  <div className="visit-detail__visit-date-container">
                    <p className="visit-detail__visit-date strong">
                      <FormattedMessage id="visitDetails.visitInfo.date" />
                    </p>
                    <span className="visit-detail__visit-date-text main-info">{dateOfVisit}</span>
                  </div>
                </div>
                <div className="visit-detail__right">
                  <div className="visit-detail__status-container">
                    <p className="visit-detail__status strong">
                      <FormattedMessage id="visitDetails.visitInfo.status" />
                    </p>
                    <ChangeVisitStatus onChange={this.changeVisitStatus} />
                  </div>
                  { !!this.state.issues.length &&
                    <Button
                      text="Get Document"
                      onClick={this.getPDF}
                      className="success"
                    />
                  }
                </div>
              </div>
            </div>
            { status === 'Planned' && localStorage.getItem('startStatus') === 'Worker'
              && 
              <>
                <div className="visit-detail__user-info-heading">
                  <h2 className="visit-detail__user-info-heading-text">Issues Information</h2>
                </div>
                <div className="visit-detail__change-please">
                  <p className="visit-detail__change-please-text">Please, change status to "In Progress" to add issues</p>
                </div>
              </>
            }
            { status === 'In Progress'
              && localStorage.getItem('startStatus') !== 'User'
              && <>
                { !this.state.isNewVisitVisible
                  && <Button
                    text={`Add new Issue ${this.addLogo}`}
                    className="visit-detail__show-new-issue"
                    onClick={this.showNewIssue}
                  />}
                <div className="visit-detail__add-issue">
                  <NewVisitEdit visible={this.state.isNewVisitVisible} onSubmit={this.submitCreateIssue} />
                </div>
              </>}
            <>
              <div className="visit-detail__issues-info">
                { issuesList.length !== 0 && issuesList }
              </div> 
            </>
          </div>
        </article>
      </main>
    );
  }
}
