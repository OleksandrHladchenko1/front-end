import React from "react";
import { topologicalSort } from "../../../services/utils";
import { Button } from "../Button";
import { DependencyItem } from "../DependencyItem/DependencyItem";

import './DependenciesModal.scss';

export const DependenciesModal = ({ issues, onFinish }) => {
  const issuesForModal = [...issues];

  const changeIssue = (itemTitle, dependTitle) => {
    const itemElement = issuesForModal.find(item => item.description === itemTitle);
    const dependsElem = itemElement.dependsOn.find(item => dependTitle === item);
    if(dependsElem) {
      itemElement.dependsOn.splice(itemElement.dependsOn.indexOf(dependTitle), 1);
      itemElement.degree--;
    } else {
      itemElement.dependsOn.push(dependTitle);
      itemElement.degree++;
    }
  };

  const startTopologicalSort = () => {
    const sortedArray = topologicalSort(issuesForModal);
    onFinish(sortedArray);
  };

  const issuelList = issuesForModal.map((issue, i) => (
    <DependencyItem
      key={i}
      item={issue}
      issues={issuesForModal}
      onChange={changeIssue}  
    />
  ));
  return (
    <div className="dependencies">
      <div className="dependencies__container">
        <h2 className="dependencies__title">Set dependencies please</h2>
        <div className="dependencies__items-container">
          {issuelList}
        </div>
        <Button
          text="Finish"
          className="dependencies__finish success"
          onClick={startTopologicalSort}
        />
      </div>
    </div>
  );
};
