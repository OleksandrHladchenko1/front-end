import React from "react";

import './Logo.scss';

export const Logo = ({
  src,
  alt,
  className,
  onClick,
}) => <img className={`logo ${className ? className : '' }`} src={src} alt={alt} onClick={onClick} />;
