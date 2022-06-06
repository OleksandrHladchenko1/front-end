import { startCase, isArray } from 'lodash';

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

export const stringToArray = (services) => {
  console.log(services);
  if(isArray(services)) return services;
  if(services.length === 2) return [];
  services = services.split(",");
  services[0] = services[0].substring(1);
  services[services.length - 1] = services[services.length - 1].substring(
    0,
    services[services.length - 1].length - 1
  );
  services.forEach((x, i) => {
    services[i] = services[i].includes('"') ? services[i].replaceAll('"', "").trim()
      : services[i].replaceAll("'", "").trim();
  });

  return services;
};
