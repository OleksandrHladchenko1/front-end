import React, { useEffect, useState } from "react";
import { getNextElement, visitStatuses } from "../../../services/utils";
import { Button } from "../Button";
import edit from '../../../assets/edit.svg';

import './ChangeVisitStatus.scss';

export const ChangeVisitStatus = ({ onChange }) => {
  const [status, setStatus] = useState(localStorage.getItem('visitStatus'));

  const setNextStatus = () => {
    const newStatus = getNextElement(visitStatuses, status);
    onChange(newStatus);
    setStatus(newStatus);
  };

  useEffect(() => {
    console.log(status);
  });

  const editLogo = (
    <img src={edit} alt="edit" />
  );

  return (
    <div className="changeStatus">
      <>
        <span className="status">{status}</span>
        { (localStorage.getItem('startStatus') === "Worker" || localStorage.getItem('startStatus') === "Admin") &&
          <Button
            text={editLogo}
            className="change-visit-status-button icons"
            onClick={setNextStatus}
          />
        }
      </>
    </div>
  );
};
