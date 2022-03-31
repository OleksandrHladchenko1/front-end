import React, { Component } from "react";

import { Button } from "../../common/Button";
import { SearchResultList } from "../../common/SearchResultList/SearchResultList";

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

  render() {
    const filterVisits = <SearchResultList result={this.state.filterVisits} onClick={this.showDetails} />
    /* const filteredVisits = this.state.filterVisits.map((visit) => {
      return (
        <div key={visit.id}>
          <span>{visit.id_user}</span>
          <span>{visit.dateOfVisit}</span>
        </div>
      )
    }); */

    return (
      <main>
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
