import React from "react";

import { Button } from "../Button";
import { DependencyItem } from "../DependencyItem/DependencyItem";

import { APIInteractor } from "../../../services";
import { stringToArray, topologicalSort } from "../../../services/utils";

import './DependenciesModal.scss';

export const DependenciesModal = ({ issues, onFinish }) => {
  const apiInteractor = new APIInteractor();
  const issuesForModal = [...issues];

  const changeIssue = (itemTitle, dependTitle) => {
    const itemElement = issuesForModal.find(item => item.description === itemTitle);
    itemElement.dependsOn = stringToArray(itemElement.dependsOn);
    const dependsElem = itemElement.dependsOn.find(item => dependTitle === item);
    if(dependsElem) {
      itemElement.dependsOn.splice(itemElement.dependsOn.indexOf(dependTitle), 1);
      itemElement.degree--;
      apiInteractor.setDependency(
        itemElement.id, 
        itemElement.degree,
        itemElement.dependsOn,
      );
    } else {
      itemElement.dependsOn.push(dependTitle);
      itemElement.degree++;
      apiInteractor.setDependency(
        itemElement.id, 
        itemElement.degree,
        itemElement.dependsOn,
      );
    }
  };

  const startTopologicalSort = () => {
    const sortedArray = topologicalSort(issuesForModal);
    console.log('sorted', sortedArray);
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
