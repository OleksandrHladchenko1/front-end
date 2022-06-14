import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button } from "../Button";

import { Close } from "../Close";
import { Input } from "../Input";
import { RequiredStar } from "../RequiredStar";

import './NewIssueModal.scss';

export const NewIssueModal = ({
  onClose,
  onSubmit,
}) => {
  const intl = useIntl();
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [newIssue, setNewIssue] = useState({
    description: '',
    price: '',
    degree: 0,
    dependsOn: [],
    closed: 'No',
  });

  const onChangeInfo = (e) => {
    setError({ isError: false, message: '' });
    const name = e.target.name;
    const value = e.target.value;
    setNewIssue({ ...newIssue, [name]: value });
  };

  useEffect(() => {
    console.log(newIssue);
  });


  const createNewIssue = () => {
    if(!newIssue.description.length || !newIssue.price.length) {
      setError({
        isError: true,
        message: <FormattedMessage id="newIssue.error" />,
      })
    } else {
      onSubmit(newIssue);
    }
  };

  return (
    <div className="new-issue">
      <div className="new-issue__conteiner">
        <div className="new-issue__header">
          <h2 className="new-issue__header-text">
            <FormattedMessage id="newIssue.issueInfo.title" />
          </h2>
        </div>
        <div className="new-issue__main">
          <div className="new-issue__description-container">
            <label htmlFor="description">
              <FormattedMessage id="newIssue.issueInfo.description.label" />
              <RequiredStar />
            </label>
            <textarea
              placeholder={intl.formatMessage({ id: 'newIssue.issueInfo.description.placeholder' })}
              className="new-issue__description form-input"
              onChange={onChangeInfo}
              name="description"
              id="description"
            >
            </textarea>
          </div>
          <Input
            type="number"
            name="price"
            placeholder={intl.formatMessage({ id: 'newIssue.issueInfo.price.placeholder' })}
            label={<FormattedMessage id="newIssue.issueInfo.price.label" />}
            className="new-issue__price form-input"
            onChange={onChangeInfo}
            required
          />
          <Button
            text={<FormattedMessage id="newIssue.workerInfo.button.save" />}
            onClick={createNewIssue}
            className="new-issue__submit success"
          />
          {
            error.isError &&
            <p className="new-issue__error error">{error.message}</p>
          }
        </div>
      </div>
      <Close onClick={onClose} />
    </div>
  )
};
