import elements from "../public/elements.json";

export type Element = {
  name: string;
  code: string;
  image: string;
  technicalValue: number;
  criteria: Record<string, string>;
  category: string;
  page_number: number;
};

export const elementCategories = {
  strength: { label: "Strength" },
  flexibility: { label: "Flexibility" },
  static: { label: "Spin on static" },
  spin: { label: "Spin on spin" },
};

export const getRandomElementCode = () => {
  const randomIndex = Math.floor(Math.random() * elements.length);

  const randomCode = elements.at(randomIndex)?.code;

  if (!randomCode) {
    throw new Error("Error getting random element");
  }

  return randomCode;
};

export function getRandomElements(n: number): Element[] {
  if (n > elements.length) {
    throw new Error("Trying to get to many elements");
  }

  const indexes: number[] = [];
  while (indexes.length < n) {
    const randomIndex = Math.floor(Math.random() * elements.length);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }

  return indexes.map((index) => elements[index]);
}

export const getElements: () => Element[] = () => {
  return elements;
};

export const getElementCodes: () => { code: string }[] = () => {
  return elements.map((element) => ({
    code: element.code,
  }));
};

export const getElement: (code: string) => Element | undefined = (
  code: string,
) => {
  return elements.find((element) => element.code === code);
};
