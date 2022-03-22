export const validateEmail = (value) => {
  if(value.trim === '') {
    return false;
  }

  const regExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gmi;

  return regExp.test(value);
};

export const validatePassword = (value) => {
  if(value.trim === '' || value.length <= 6) {
    return false;
  }
  return true;
}

export const validateField = (value) => {
  if(value.trim === '' || value.length <= 3) {
    return false;
  }
  return true;
}

export const validatePhoneNumber = (value) => {
  if(value.trim === '') {
    return false;
  }

  const regExp = /[+]\d{12}/gmi;

  return regExp.test(value);
}