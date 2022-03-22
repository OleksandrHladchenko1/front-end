import React from 'react';

import PropTypes from 'prop-types';

import './Button.scss';

export const Button = ({ text, type, className, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick} >{text}</button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string,

};

Button.defaultProps = {
  type: 'button',
};
