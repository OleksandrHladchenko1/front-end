import { last } from 'lodash';

export const getLastElement = (array) => last(array);

export const getNextElement = (array, element) => {
  let elementPosition = array.findIndex(item => item.value === element);
  const nextElementPosition = elementPosition === array.length - 1 ? 0 : elementPosition + 1;

  return array[nextElementPosition].text
};
