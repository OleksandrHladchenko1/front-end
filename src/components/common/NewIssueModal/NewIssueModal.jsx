import React, { useEffect, useState } from "react";
import { Button } from "../Button";

import { Close } from "../Close";
import { Input } from "../Input";
import { RequiredStar } from "../RequiredStar";

import './NewIssueModal.scss';

export const NewIssueModal = ({
  onClose,
  onSubmit,
}) => {
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
        message: 'Please, fill all the required fields!',
      })
    } else {
      onSubmit(newIssue);
    }
  };
  /* useEffect(() => {
    apiInteractor.getProblemTypes().then(data => {
      const newData = data.map((item) => ({
        value: item.id,
        text: item.name,
      }));
      setProblems(newData);
    });
  }, []); */ 

  return (
    <div className="new-issue">
      <div className="new-issue__conteiner">
        <div className="new-issue__header">
          <h2 className="new-issue__header-text">Add new issue</h2>
        </div>
        <div className="new-issue__main">
          <div className="new-issue__description-container">
            <label htmlFor="description">Description<RequiredStar /></label>
            <textarea
              placeholder="Description..."
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
            placeholder="Price..."
            label="Price"
            className="new-issue__price form-input"
            onChange={onChangeInfo}
            required
          />
          <Button
            text="Create"
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
