import { ElementIndexEntry } from "./elements";

type ElementCounts = {
  categories: {
    strength: number;
    flexibility: number;
    spin: number;
    static: number;
  };
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
};

export function countElements(elements: ElementIndexEntry[]): ElementCounts {
  const counts: ElementCounts = {
    categories: {
      strength: 0,
      flexibility: 0,
      spin: 0,
      static: 0,
    },
    difficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
  };

  for (const element of elements) {
    // category
    counts.categories[element.category]++;

    // difficulty
    if (element.technicalValue <= 0.4) {
      counts.difficulty.easy++;
    } else if (element.technicalValue <= 0.7) {
      counts.difficulty.medium++;
    } else {
      counts.difficulty.hard++;
    }
  }

  return counts;
}
