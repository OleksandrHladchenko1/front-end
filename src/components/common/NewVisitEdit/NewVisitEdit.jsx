import React, { useEffect, useState } from "react";

import { Input } from "../Input";
import { Select } from "../Select";
import { Button } from "../Button";

import { concatFullName, newIssueShape } from "../../../services/utils";

import './NewVisitEdit.scss';

export const NewVisitEdit = ({ workers, visible, onSubmit }) => {
  const [newIssueInfo, setNewIssueInfo] = useState(newIssueShape);

  /* useEffect(() => {
    console.log(newIssueInfo);
  }, [newIssueInfo]); */

  const onChangeInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewIssueInfo({ ...newIssueInfo, [name]: value });
  };

  const onChangeWorker = (e) => {
    const worker = workers.filter((worker) => worker.specialistId === parseInt(e.target.value))[0];
    setNewIssueInfo({
      ...newIssueInfo,
      ...worker,
    });
  };

  const selectData = () => {
    const dataForRender = workers.map((worker) => {
      return {
        value: worker.specialistId,
        text: `${concatFullName(worker.firstName, worker.lastName, worker.fatherName)} (${worker.speciality})`,
      };
    });
    return dataForRender;
  };

  return visible && (
    <div className="edit">
      <div className="edit__container">
        <div className="edit__issue-info">
          <h3 className="edit__issue-title">Add issue info</h3>
          <Input
            placeholder="Description"
            name="description"
            label="Description"
            value={newIssueInfo.description}
            onChange={onChangeInfo}
            required
          />
          <Input
            type="datetime-local"
            name="startTime"
            label="Start of work"
            value={newIssueInfo.startTime}
            onChange={onChangeInfo}
            required
          />
          <Input
            type="datetime-local"
            name="endTime"
            label="End of work"
            value={newIssueInfo.endTime}
            onChange={onChangeInfo}
            required
          />
          <Input
            type="number"
            name="price"
            label="Price (UAH)"
            value={newIssueInfo.price}
            onChange={onChangeInfo}
            required
          />
        </div>
        <div className="edit__worker-info">
          <h3 className="edit__issue-title">Add worker info</h3>
          <Select
            name="workers"
            label="Workers"
            className="edit__worker-select"
            options={selectData()}
            onChange={onChangeWorker}
            required
          />
        </div>
        <div className="edit__submit">
          <Button
            text="Save"
            onClick={() => {
              onSubmit(newIssueInfo);
              setNewIssueInfo(newIssueShape);
            }}
            className="edit__submit-button button success"
          />
        </div>
      </div>
    </div>    
  );
};
