import React from "react";

import './Logo.scss';

export const Logo = ({ src, alt, className }) => <img className={`logo ${className ? className : '' }`} src={src} alt={alt} />;
