import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { saveAs } from 'file-saver';

import { ChangeVisitStatus } from '../../common/ChangeVisitStatus';
import { Button } from '../../common/Button';
import { Modal } from "../../common/Modal";
import { AreYouSureModal } from "../../common/AreYouSureModal";
import { IssueItem } from '../../common/IssueItem';

import { APIInteractor } from '../../../services';
import { concatFullName, formatDate, formatTime, stringToArray } from '../../../services/utils';
import plus from '../../../assets/plus.svg';

import './VisitDetails.scss';
import { NewIssueModal } from '../../common/NewIssueModal/NewIssueModal';
import { DependenciesModal } from '../../common/DependenciesModal/DependenciesModal';

export class VisitDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: {},
      user: {},
      visit: {},
      issues: [],
      status: localStorage.getItem('visitStatus'),
      isModalOpen: false,
      isNewIssueModalOpen: false,
      isReviewFinished: false,
      isDependencyModalOpen: false,
      isSorted: localStorage.getItem('isSorted') === 'Yes' ? true : false,
      isConfirmationFinishingOpen: false,
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
    this.getIssuesBeforeSort();
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.visit.status !== this.state.visit.status) {
      this.getDataAfterUpdate();
    }
  };

  getIssuesBeforeSort = async () => {
    this.apiInteractor.getVisitIssuesBeforeSort(localStorage.getItem('visitId')).then((data) => {
      this.setState({ issues: [...data] });
    });
  }

  changeVisitStatus = (status) => {
    this.setState((prevState) => ({
      ...prevState,
      visit: { ...prevState.visit, status }
    }));
    this.setState({ status });
    localStorage.setItem('visitStatus', status);
    this.apiInteractor.changeVisitStatus(localStorage.getItem('visitId'), status);
  };

  showNewIssueModal = () => {
    this.setState({ isNewIssueModalOpen: true });
  };

  hideNewIssueModal = () => {
    this.setState({ isNewIssueModalOpen: false });
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
    this.apiInteractor.deleteIssue(id).then(() => {
      this.getIssuesBeforeSort();
    });
  };

  getPDF = () => {
    console.log(this.state);
    this.apiInteractor.createPDF(JSON.stringify(this.state)).then(() => {
      this.apiInteractor.downloadPDF().then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `${this.state.visit.dateOfVisit}_${this.state.user.fullName}.pdf`);
      });
    });
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeDeleteModal = () => {
    this.setState({ isModalOpen: false });
  }

  deleteVisit = () => {
    this.apiInteractor.deleteVisit().then(() => document.location.pathname = '/visits');
  }

  addIssue = (issue) => {
    console.log(issue);

    this.apiInteractor.addIssue({
      ...issue,
      visitId: localStorage.getItem('visitId'),
      dependsOn: JSON.stringify(issue.dependsOn),
    }).then(() => {
      this.setState({ isNewIssueModalOpen: false });
      this.getIssuesBeforeSort();
    });
  }

  finishReview = () => {
    this.setState({
      isReviewFinished: true,
      isDependencyModalOpen: true,
    });
  }

  sortIssues = async (sortedIssues) => {
    const newArray = sortedIssues.map((item, i) => ({
      id: item.id,
      sequence: i
    }));
    this.apiInteractor.setSequence(newArray).then(() => {
      this.apiInteractor.setSorted(localStorage.getItem('visitId')).then(() => {
        localStorage.setItem('isSorted', 'Yes');
        this.apiInteractor.getSortedIssues(localStorage.getItem('visitId')).then((data) => {
          this.setState({
            issues: data,
            isSorted: true,
            isDependencyModalOpen: false,
          });
        });
      });
    });
  }

  openConfarmationFinishing = () => {
    this.setState({ isConfirmationFinishingOpen: true });
  }

  closeConfirmationFinishing = () => {
    this.setState({ isConfirmationFinishingOpen: false });
  }

  continueFinishing = () => {
    this.closeConfirmationFinishing();
    this.finishReview();
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
        <IssueItem
          canDelete={!this.state.isSorted}
          canSave={this.state.isSorted}
          key={index}
          issue={issue}
          onDelete={this.deleteIssue}
        />
      ));

    return (
      <main>
        <Modal isModalOpen={this.state.isModalOpen}>
          <AreYouSureModal
            onCancel={this.closeDeleteModal}
            onSubmit={this.deleteVisit}
            headerText={<FormattedMessage id="areYouSure.title.deleteVisit" />}
            mainText={<FormattedMessage id="areYouSure.text.deleteVisit" />}
          />
        </Modal>
        <Modal isModalOpen={this.state.isConfirmationFinishingOpen}>
          <AreYouSureModal
            onCancel={this.closeConfirmationFinishing}
            onSubmit={this.continueFinishing}
            headerText={<FormattedMessage id="areYouSure.title.warning" />}
            mainText={<FormattedMessage id="areYouSure.text.continueSort" />}
          />
        </Modal>
        <Modal isModalOpen={this.state.isNewIssueModalOpen}>
          <NewIssueModal
            onClose={this.hideNewIssueModal}
            onSubmit={this.addIssue}  
          />
        </Modal>
        <Modal isModalOpen={this.state.isDependencyModalOpen}>
          <DependenciesModal issues={this.state.issues} onFinish={this.sortIssues} />
        </Modal>
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
                <Button
                  text={<FormattedMessage id="visitDetails.button.delete" />}
                  onClick={this.openModal}
                  className="visit-detail__delete-button"
                />
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
                      text={<FormattedMessage id="newIssue.getDocument" />}
                      onClick={this.getPDF}
                      className="visit-detail__doc success"
                    />
                  }
                </div>
              </div>
            </div>
            { status === 'Planned' && (localStorage.getItem('startStatus') === 'Worker' || localStorage.getItem('startStatus') === 'Admin')
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
              && !this.state.isReviewFinished
              && localStorage.getItem('isSorted') === 'No'
              &&
              <Button
                text={<FormattedMessage id="visitDetails.addNewIssue" />}  
                className="visit-detail__show-new-issue success"
                onClick={this.showNewIssueModal}
              />
            }
            {
              !!issuesList.length && !this.state.isSorted &&
              <Button
                text={<FormattedMessage id="visitDetails.finishReview" />}
                className="visit-detail__finish-review success"
                onClick={this.openConfarmationFinishing}
              />
            }
            {
              <div className="visit-detail__issues-info">
                { issuesList.length !== 0 && issuesList }
              </div>
            }
          </div>
        </article>
      </main>
    );
  }
}
