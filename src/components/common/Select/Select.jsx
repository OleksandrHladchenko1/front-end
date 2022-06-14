import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

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
  const intl = useIntl();
  return (
    <div className="input-container">
      { label && 
        <label className="input-label" htmlFor={name}>{label}{required ? <RequiredStar /> : ''}</label>
      }
      <select className={className} name={name} onChange={onChange} value={value}>
        <option className="disabled" selected disabled>
          {intl.formatMessage({ id:"select.defaultMessage" })}
        </option>
        {
          options.map((option, i) => <option key={`${option.value}-${i}`} value={option.value}>{intl.formatMessage({ id: option.text })}</option>)
        }
      </select>
    </div>
  );
};
