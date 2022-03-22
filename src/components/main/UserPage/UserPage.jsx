import React, { Component } from "react";
import { APIInteractor } from "../../../services";
import { formatBirthday } from "../../../services/utils";

import './UserPage.scss';

export class UserPage extends Component {
  state = {
    user: {},
  };

  apiInteractor = new APIInteractor();

  componentDidMount = async () => {
    const result = await this.apiInteractor.getUserById(localStorage.getItem('userId'));
    this.setState({ user: result });
    console.log(this.state.user);
  }

  render() {
    const { discount, dateOfBirth } = this.state.user;

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
          <div className="user__info">
            <div className="user__header-info">
              <div className="user__bonuses">
                <h2 className="user__bonuses-title">Bonuses</h2>
                <h3 className="user__bonuses-amount">{discount} %</h3>
              </div>
              <div className="user__birthday">
                <h2 className="user__birthday-title">Birthday</h2>
                <h3 className="user__birthday-amount">{formatBirthday(dateOfBirth)}</h3>
              </div>
            </div>
          </div>
        </article>
      </main>
    );
  }
}

/* export const UserPage = () => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const fetchUser = () => {
      apiInteractor.getUserById(localStorage.getItem('userId')).then((user) => {
        setUserInfo(user);
        //console.log(userInfo);
      });
    };
    fetchUser();
  }, []);

  return (
    <span>{JSON.stringify(userInfo)}</span>
  );
} */
