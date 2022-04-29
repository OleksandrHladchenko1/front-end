import React, { useRef } from "react";
import { Input } from "../Input";

import './RadioButtonGroup.scss';

export const RadioButtonGroup = ({
  options,
  onChange,
  name,
}) => {
  const radioRef = useRef();
  const radioButtonGroup = options.map((option, i) => {
    return (
      <Input
        key={i}
        className="radio-button"
        name={name}
        type="radio"
        value={option.value}
        label={option.text}
        onChange={() => onChange(radioRef.current)}
      />
    )
  });
  return (
    <div className="radio-buttons-group" ref={radioRef}>
      {radioButtonGroup}
    </div>
  )
};
