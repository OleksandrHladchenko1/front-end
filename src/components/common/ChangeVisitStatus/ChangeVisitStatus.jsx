import React, { useEffect, useState } from "react";
import { visitStatuses } from "../../../services/utils";
import { Button } from "../Button";
import { Select } from '../Select';
import edit from '../../../assets/edit.svg';
import ok from '../../../assets/ok.svg';
import cancel from '../../../assets/cancel.svg';

import './ChangeVisitStatus.scss';

export const ChangeVisitStatus = ({ currentStatus = '', onChange }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const filterStatuses = visitStatuses.filter((status) => status !== currentStatus);

  useEffect(() => {
    //console.log(status);
  });

  const editLogo = (
    <img src={edit} alt="edit" />
  );

  const okLogo = (
    <img src={ok} alt="ok" />
  );

  const cancelLogo = (
    <img src={cancel} alt="ok" />
  );

  return (
    <div className="changeStatus">
      { !isEditMode &&
      <>
        <span className="status">{currentStatus}</span>
        <Button
          text={editLogo}
          className="change-visit-status-button icons"
          onClick={() => setIsEditMode(true)}
        />
      </>
      }
      { isEditMode &&
        <>
          <div className="change-visit-status">
            <Select
              name="visitStatus"
              options={filterStatuses}
              className="change-visit-status-select"
              onChange={(e) => setStatus(e.target.value)}
            />
            <Button
              text={okLogo}
              className="change-visit-status-button-confirm icons"
              onClick={() => {
                onChange(status);
                setIsEditMode(false);
              }}
            />
            <Button
              text={cancelLogo}
              className="change-visit-status-button-cancel icons"
              onClick={() => {
                setIsEditMode(false);
              }}
            />
          </div>
        </>
      }
    </div>
  );
};
