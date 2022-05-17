import React from "react";

import { RequiredStar } from "../RequiredStar";

import './Select.scss';

export const Select = ({
  name,
  label,
  required,
  options,
  className,
  onChange,
  value,
}) => {
  return (
    <div className="input-container">
      { label && 
        <label className="input-label" htmlFor={name}>{label}{required ? <RequiredStar /> : ''}</label>
      }
      <select className={className} name={name} onChange={onChange} value={value}>
        <option className="disabled" selected disabled>Choose here</option>
        {
          options.map((option, i) => <option key={`${option.value}-${i}`} value={option.value}>{option.text}</option>)
        }
      </select>
    </div>
  );
};
