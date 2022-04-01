import React from 'react';
import { noop } from 'lodash';

import PropTypes from 'prop-types';

import './Input.scss';

export const Input = ({
  type,
  placeholder,
  className,
  onChange,
  name,
  value,
  pattern,
  label,
}) => {
  return (
    <div className='input-container'>
      <label className='input-label' htmlFor={name}>{label}</label>
      <input
        type={type} 
        name={name}
        placeholder={placeholder}
        className={`input-text ${className}`}
        onChange={onChange}
        value={value}
        pattern={pattern}
      />
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  pattern: PropTypes.string,
  label: PropTypes.string,
};

Input.defaultProps = {
  placeholder: ' ',
  type: 'text',
  onChange: noop,
  value: undefined,
  pattern: null,
  label: '',
};
