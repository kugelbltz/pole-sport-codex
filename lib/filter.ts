import { ElementIndexEntry } from "./elements";

type FilterOptions = {
  categories?: string[];
  minTechnicalValue?: number;
  maxTechnicalValue?: number;
};

export function filterElements(
  elements: ElementIndexEntry[],
  filters: FilterOptions,
) {
  return elements.filter((element) => {
    if (
      filters.categories &&
      filters.categories.length > 0 &&
      !filters.categories.includes(element.category)
    )
      return false;

    if (
      filters.minTechnicalValue &&
      element.technicalValue < filters.minTechnicalValue
    )
      return false;

    if (
      filters.maxTechnicalValue &&
      element.technicalValue > filters.maxTechnicalValue
    )
      return false;

    return true;
  });
}
