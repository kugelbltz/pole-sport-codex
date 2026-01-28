import elements from "../public/elements.json";

export const getRandomElementCode = () => {
  const randomIndex = Math.floor(Math.random() * elements.length);

  const randomCode = elements.at(randomIndex)?.code;

  if (!randomCode) {
    throw new Error("Error getting random element");
  }

  return randomCode;
};

export const getElements = () => {
  return elements;
};

export const getElementCodes = () => {
  return elements.map((element) => ({
    code: element.code,
  }));
};

export const getElement = (code: string) => {
  return elements.find((element) => element.code === code);
};
