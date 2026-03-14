import Fuse from "fuse.js";
import { ElementIndexEntry, loadElementIndex } from "./elements";

const elements = loadElementIndex();

const fuse = new Fuse(elements, {
  keys: [
    { name: "id", weight: 4 },
    { name: "name", weight: 3 },
    { name: "aliases", weight: 2 },
    { name: "searchTokens", weight: 1 },
  ],
  threshold: 0.35,
});

export function searchElements(query: string): ElementIndexEntry[] {
  if (!query) return elements;
  return fuse.search(query).map((r) => r.item);
}
