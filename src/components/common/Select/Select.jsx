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
}) => {
  return (
    <div className="input-container">
      { label && 
        <label className="input-label" htmlFor={name}>{label}{required ? <RequiredStar /> : ''}</label>
      }
      <select className={className} name={name} onChange={onChange}>
        <option className="disabled" selected disabled hidden>Choose here</option>
        {
          options.map((option, i) => <option key={`${option}-${i}`} value={option.code || option}>{option.region || option}</option>)
        }
      </select>
    </div>
  );
};
