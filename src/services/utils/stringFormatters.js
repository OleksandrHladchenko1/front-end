import { startCase } from 'lodash';

export const upperFirstLetter = (string) => startCase(string);

export const concatCarNumber = (
  code,
  number,
  series,
) => `${code} ${number} ${series}`;

export const concatFullName = (firstName, lastName, fatherName) => `${firstName} ${lastName} ${fatherName}`;

export const extractFromCarNumber = (carNumber) => {
  return {
    carCode: carNumber.substring(0, 2),
    carNumber: carNumber.substring(3, 7),
    carSeries: carNumber.substring(8, 10),
  };
};
