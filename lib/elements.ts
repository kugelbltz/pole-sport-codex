import index from "../public/element_index.json";
import { z } from "zod";

const CategorySchema = z.enum(["flexibility", "spin", "static", "strength"]);
const CriteriaTypesSchema = z.enum([
  "hold",
  "points_of_contact",
  "arm_grip",
  "leg_position",
  "body_position",
  "angle_of_split",
  "starting_position",
  "unknown",
]);
const CriteriaSchema = z.array(
  z.object({
    type: CriteriaTypesSchema,
    items: z.array(z.string()),
  }),
);

export const ElementSchema = z.object({
  id: z.string(),
  name: z.string(),
  aliases: z.array(z.string()).optional(),
  tips: z.array(z.string()).optional(),
  technicalValue: z.number(),
  category: CategorySchema,
  page: z.number(),
  format: z.enum(["single", "double", "unknown"]),
  criteria: z.array(
    z.object({
      type: CriteriaTypesSchema,
      items: z.array(z.string()),
    }),
  ),
  videos: z
    .array(
      z.object({
        type: z.enum(["youtube"]),
        url: z.url(),
      }),
    )
    .optional(),
  relatedMoves: z.array(z.string()).optional(),
});

export const ElementIndexEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  aliases: z.array(z.string()),
  category: CategorySchema,
  technicalValue: z.number(),
  criteriaTypes: z.array(CriteriaTypesSchema),
  searchTokens: z.array(z.string()),
});

export const ElementIndexSchema = z.array(ElementIndexEntrySchema);

export type Element = z.infer<typeof ElementSchema>;
export type ElementIndexEntry = z.infer<typeof ElementIndexEntrySchema>;
export type ElementIndex = z.infer<typeof ElementIndexSchema>;
export type Criteria = z.infer<typeof CriteriaSchema>;
export type CriteriaType = z.infer<typeof CriteriaTypesSchema>;

export function loadElementIndex(): ElementIndex {
  return ElementIndexSchema.parse(index);
}

export async function loadElement(id: string): Promise<Element> {
  const data = await import(`../public/elements/${id}.json`);
  return ElementSchema.parse(data);
}

export function getElementImagePath(id: string): string {
  return `/images/400/${id}.webp`;
}

export const elementCategories = {
  strength: { label: "Strength" },
  flexibility: { label: "Flexibility" },
  static: { label: "Spin on static" },
  spin: { label: "Spin on spin" },
};

export const getRandomElementCode = () => {
  const elements = loadElementIndex();
  const randomIndex = Math.floor(Math.random() * elements.length);

  const randomCode = elements.at(randomIndex)?.id;

  if (!randomCode) {
    throw new Error("Error getting random element");
  }

  return randomCode;
};
