const apiUrl = 'https://norma.nomoreparties.space/api';

const getData = () => {
  return fetch(`${apiUrl}/ingredients`);
};

export { getData };