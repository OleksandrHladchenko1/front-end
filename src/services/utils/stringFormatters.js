import { startCase } from 'lodash';

export const upperFirstLetter = (string) => startCase(string);

export const concatCarNumber = (
  code,
  number,
  series,
) => `${code} ${number} ${series}`;

export const concatFullName = (firstName, lastName, fatherName) => `${firstName} ${lastName} ${fatherName}`;