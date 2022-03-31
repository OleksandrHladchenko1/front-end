import React, { Component } from "react";

import { Button } from "../../common/Button";
import { SearchResultList } from "../../common/SearchResultList/SearchResultList";
import { Modal } from "../../common/Modal";
import { Close } from "../../common/Close";

import { APIInteractor } from "../../../services";
import { removeClassName, upperFirstLetter, getLastElement } from "../../../services/utils";

import './VisitPage.scss';

export class VisitPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'Planned',
      visits: [],
      filterVisits: [],
      isModalOpen: false,
    }

    this.apiInteractor = new APIInteractor();
  }

  updateFilters = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        filterVisits: prevState.visits.filter((visit) => visit.status === prevState.status),
      };
    });
  }

  getUserVisits = async () => {
    const result = await this.apiInteractor.getUserVisits({
      userId: localStorage.getItem('userId'),
    });
    return result;
  }

  componentDidMount = async () => {
    this.getUserVisits().then((result) => {
      this.setState({ visits: [...result] });
      this.updateFilters();
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.status !== prevState.status) {
      this.updateFilters();
    }
  }

  filterVisits = (e) => {
    removeClassName('.active', 'active');
    this.setState({ status: upperFirstLetter(getLastElement(e.target.classList)) });
    e.target.classList.toggle('active');
  }

  showDetails = () => {
    console.log('details');
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  render() {
    const filterVisits = <SearchResultList result={this.state.filterVisits} onClick={this.showDetails} />

    return (
      <main>
        <Modal isModalOpen={this.state.isModalOpen}>
          <form className="new-visit">
            <div className="new-visit__heading-container">
              <div className="new-visit__heading">
                <h2 className="new-visit-title">Create new visit</h2>
              </div>
            </div>
            <div className="new-visit__inputs-container">

            </div>
            <div className="new-visit__button-container">

            </div>
            <Close onClick={this.closeModal}/>
          </form>
        </Modal>
        <article className="visits">
          <div className="visits__my">
            <div className="visits__filter-container">
              <ul className="visits__filter">
                <li className="visits__filter-critetia">
                  <Button
                    text="Planned"
                    onClick={this.filterVisits}
                    className="visits__button planned active"
                  />
                </li>
                <li className="visits__filter-critetia">
                  <Button
                    text="In Progress"
                    onClick={this.filterVisits}
                    className="visits__button inProgress"
                  />
                </li>
                <li className="visits__filter-critetia">
                  <Button
                    text="Closed"
                    onClick={this.filterVisits}
                    className="visits__button closed"
                  />
                </li>
              </ul>
            </div>
            <div className="visits__results-container">
              {filterVisits}
            </div>
            <div className="visits__add-container">
              <Button
                text="Create visit"
                onClick={this.openModal}
                className="visits__add-button button success"
              />
            </div>
          </div>
        </article>
      </main>
    );
  }
};

/* export const VisitPage = () => {
  const apiInteractor = new APIInteractor();
  const [status, setStatus] = useState('Planned');
  const [visits, setVisits] = useState([]);

  const getData = () => {
    apiInteractor.getUserVisits({ status, userId: localStorage.getItem('userId') }).then((data) => {
      setVisits(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const filterVisits = (e) => {
    removeClassName('.active', 'active');
    setStatus(upperFirstLetter(getLastElement(e.target.classList)));
    e.target.classList.toggle('active');
    getData();
  };
}; */
