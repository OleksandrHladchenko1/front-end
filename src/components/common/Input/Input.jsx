import React from 'react';
import { noop } from 'lodash';

import PropTypes from 'prop-types';

import './Input.scss';

export const Input = ({
  type,
  placaholder,
  className,
  onChange,
  name,
  value,
  pattern,
}) => {
  return (
    <input
      type={type} 
      name={name}
      placeholder={placaholder}
      className={className}
      onChange={onChange}
      value={value}
      pattern={pattern}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  placaholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  pattern: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  onChange: noop,
  value: undefined,
  pattern: null,
};
