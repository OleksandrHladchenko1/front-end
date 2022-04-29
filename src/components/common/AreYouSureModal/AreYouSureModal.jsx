import React from "react";
import { Button } from "../Button";

import { Close } from '../Close';

import './AreYouSureModal.scss';

export const AreYouSureModal = ({
  headerText,
  mainText,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="are-you-sure">
      <div className="are-you-sure__container">
        <div className="are-you-sure__header">
          <h3 className="are-you-sure__header-text">{headerText}</h3>
        </div>
        <div className="are-you-sure__main">
          <p className="are-you-sure__main-text">{mainText}</p>
        </div>
        <div className="are-you-sure__footer">
          <Button
            text="YES"
            onClick={onSubmit}
            className="are-you-sure__yes"
          />
          <Button
            text="NO"
            onClick={onCancel}
            className="are-you-sure__no"
          />
        </div>
      </div>
      <Close onClick={onCancel} />
    </div>
  );
};
