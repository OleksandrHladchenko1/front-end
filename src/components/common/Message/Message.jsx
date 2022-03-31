import React, { useEffect, useState } from "react";

import { Button } from '../Button';

import './Message.scss';

export const Message = ({ title }) => {
  const [messageClass, setMessageClass] = useState(['toast', 'toast_message', 'toast_show']);

  useEffect(() => {
    createClassList('success', 'toast_error');
    console.log(messageClass.join(' '));
  }, []);

  const createClassList = (status = '', className) => {
    if(status === 'success') {
      setMessageClass([ ...messageClass, className ]);
    } else if (status === 'error') {

    }
    console.log(messageClass.join(' '));
    return messageClass;
  };

  const deleteClassList = (className) => {
    setMessageClass([ ...messageClass.filter(item => item !== className) ]);
  } ;

  const hideMessage = () => {
    deleteClassList('toast_show');
  };

  return (
    <div className={messageClass.join(' ')}/* "toast toast_message toast_default toast_show" */>
      <div className="toast__body">{title}</div>
      <Button className="toast__close" onClick={hideMessage} />
    </div>
  );
};
