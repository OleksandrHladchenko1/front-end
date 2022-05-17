export const validateEmail = (value) => {
  if(value.trim() === '') {
    return false;
  }

  const regExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gmi;

  return regExp.test(value);
};

export const validatePassword = (value) => {
  if(value.trim() === '' || value.length <= 6) {
    return false;
  }
  return true;
}

export const validateField = (value) => {
  console.log(value.toString().length);
  if(!value.toString().length) {
    return false;
  }
  return true;
}

export const validatePhoneNumber = (value) => {
  if(value.trim() === '') {
    return false;
  }

  const regExp = /[+]\d{12}/gmi;

  return regExp.test(value);
}

export const validateYear = (year) => {
  if(year.toString().trim() === '' || isNaN(year)) {
    return false;
  }
  const newYear = new Date().getFullYear();

  return newYear >= year;
};

export const validateCarNumber = (number) => number.length === 4 && !isNaN(number);

export const validateEngineNumber = (number) => number.length === 8 && !isNaN(number);
