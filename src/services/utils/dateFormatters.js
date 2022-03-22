import { months } from "./constants";

export const formatBirthday = (date) => {
  if(!date) return;
  const shortDate = date.substr(0, 10);
  const year = shortDate.substr(0, 4);
  const day = shortDate.substring(8, 10);
  const monthIndex = shortDate.substring(5, 7); 
  const month = findMonth(monthIndex);

  return `${month} ${day}, ${year}`;
};

export const findMonth = (index) => {
  const updatedIndex = transformMonthIndex(index);
  return months.find((el, i) => i.toString() === updatedIndex);
};

export const transformMonthIndex = (index) => {
  if(index[0] === '0') return index[1];
  return index;
};
