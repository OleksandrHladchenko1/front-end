import React from "react";

import './DependencyItem.scss';

export const DependencyItem = ({ item, issues, onChange }) => {
  const dependedIssues = issues.filter((issue) => issue.description !== item.description);

  const onCheckboxClick = (desc) => {
    onChange(item.description, desc);
  };
  return (
    <div className="dependency-item">
      <div className="dependency-item__container">
        <div className="dependency-item__info">
          <div className="dependency-item__description">
            <h3 className="dependency-item__description-title">Description</h3>
            <h5 className="dependency-item__description-text">{item.description}</h5>
          </div>
        </div>
        <div className="dependency-item__dependencies">
          <p className="dependency-item__der-title">This task can depend on...</p>
          <div className="dependency-item__dependencies-container">
            {
              dependedIssues.map((issue, i) => (
                <div>
                  <input className="dependency-item__item-checkbox" type="checkbox" onClick={() => onCheckboxClick(issue.description)} />
                  <label className="dependency-item__item-label">{issue.description}</label>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
};
