import React from "react";

import './Modal.scss';

export const Modal = ({ isModalOpen, children }) => {

  return (
    <>
      {isModalOpen &&
        <div className="modal">
          {children}
        </div>
      }
    </>
  );
};
