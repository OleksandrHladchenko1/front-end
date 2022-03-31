import React from 'react';
import { noop } from 'lodash';

import PropTypes from 'prop-types';

import './Button.scss';

export const Button = ({ text, type, className, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick} >{text}</button>
  );
};

Button.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onClick: PropTypes.func,
  className: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  text: '',
  type: 'button',
  onClick: noop,
};
