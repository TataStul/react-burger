const apiUrl = "https://norma.nomoreparties.space/api";

const getData = async () => {
  const response = await fetch(`${apiUrl}/ingredients`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const result = await response.json();
  return result;
};

export { getData };
