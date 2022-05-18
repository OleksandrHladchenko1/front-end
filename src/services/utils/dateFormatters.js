import { months } from "./constants";

export const formatDate = (date) => {
  if(!date) return;
  const shortDate = date.substr(0, 10);
  const year = shortDate.substr(0, 4);
  const day = parseInt(shortDate.substring(8, 10)) + 1;
  const monthIndex = shortDate.substring(5, 7); 
  const month = findMonth(monthIndex);

  return `${month} ${day}, ${year}`;
};

export const formatTime = (date) => {
  const hour = date.substring(11, 13);
  const minute = date.substring(14, 16);

  return `${hour}:${minute}`;
};

export const findMonth = (index) => {
  const updatedIndex = transformMonthIndex(index);
  return months.find((el, i) => i === parseInt(updatedIndex) - 1);
};

export const transformMonthIndex = (index) => {
  if(index[0] === '0') return index[1];
  return index;
};

export const formatVisitDate = (date) => {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const hour = date.substring(11, 13);
  const minute = date.substring(14, 16);

  return `${year}-${month}-${day} ${hour}:${minute}:00`;

};

export const validateWorkingDay = (data) => {
  const date = new Date(data);
  const dayIndex = date.getDay();
  const result = dayIndex === 0 || dayIndex === 6 ? false : true;
  return result;
};

export const validateWorkingHour = (data) => {
  const date = new Date(data);
  const hour = date.getHours();
  const result = hour < 8 || hour > 18 ? false : true;
  return result;
};

export const validateIsPastDate = (data) => {
  return new Date(data) > new Date();
};

export const validateIsFutureDate = (data) => new Date(data) < new Date();

export const formatForDatePickerValue = (data) => {
  if(!data) return false;
  const day = parseInt(data.substring(8, 10)) + 1;
  const formatDate = day < 10 ? `0${day}` : day;
  return `${data.substring(0, 8)}${formatDate}`;
};

export const getDuration = (start, end) => {
  if(!start || !end) return false;
  const startDate = new Date(start);
  const endDate = new Date(end);
  let difference = endDate - startDate;

  const days = Math.floor(difference / 86400000);
  difference = difference - days * 86400000;
  const hours = Math.floor(difference / 3600000);
  difference = difference - hours * 3600000;
  const minutes = difference / 60000;

  let daysToShow;
  let hoursToShow;
  let minutesToShow;

  if(days === 0) {
    daysToShow = '';
  } else {
    daysToShow = days === 1 ? `${days} day` : `${days} days` ;
  }

  if(hours === 0) {
    hoursToShow = '';
  } else {
    hoursToShow = hours === 1 ? `${hours} hour` : `${hours} hours` ;
  }

  if(minutes === 0) {
    minutesToShow = '';
  } else {
    minutesToShow = minutes === 1 ? `${minutes} minute` : `${minutes} minutes` ;
  }

  return `${daysToShow} ${hoursToShow} ${minutesToShow}`;
};


