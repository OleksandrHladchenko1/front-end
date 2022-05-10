import React from "react";
import { Button } from "../Button";
import { Logo } from "../Logo";

import edit from '../../../assets/edit.svg';
import remove from '../../../assets/cancel.svg';

import './Worker.scss';

export const Worker = ({ worker, sequence, onDelete, onEdit }) => {
  const editButton = <Logo src={edit} alt="edit" className="worker__edit-icon" />;
  const deleteButton = <Logo src={remove} alt="delete" className="worker__delete-icon" />;
  const getClassName = () => {
    return `item ${sequence % 2 === 0 ? 'even' : 'odd'}`;
  };
  const {
    id,
    firstName,
    lastName,
    fatherName,
    email,
    phoneNumber,
  } = worker;
  return (
    <ul className={`worker__list ${getClassName()}`}>
      <li className="worker__item">{firstName}</li>
      <li className="worker__item">{lastName}</li>
      <li className="worker__item">{fatherName}</li>
      <li className="worker__item">{email}</li>
      <li className="worker__item">{phoneNumber}</li>
      <li className="worker__item buttons-container">
        <Button
          text={editButton}
          className="worker__button"
          onClick={() => onEdit(id)}
        />
        <Button
          text={deleteButton}
          className="worker__button"
          onClick={() => onDelete(id)}
        />
      </li>
    </ul>
  );
};
