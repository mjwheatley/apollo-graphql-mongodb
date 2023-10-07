let currentNumber = 0;

export const getCurrentNumber = (): number => {
  return currentNumber;
};

export const incrementNumber = () => {
  return ++currentNumber;
};
