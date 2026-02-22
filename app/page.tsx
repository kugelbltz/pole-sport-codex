"use client";

import { SuggestionSearchBar } from "@/components/search-bar";
import {
  Item,
  ItemContent,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { getElements } from "@/lib/elements";
import { BicepsFlexed, LineSquiggle, LoaderPinwheel, Lock } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const elements = getElements();

  const strengthElements = elements.filter(
    (element) => element.category === "strength",
  );
  const flexibilityElements = elements.filter(
    (element) => element.category === "flexibility",
  );
  const spinElements = elements.filter(
    (element) => element.category === "spin",
  );
  const staticElements = elements.filter(
    (element) => element.category === "static",
  );

  const easyElements = elements.filter(
    (element) => element.technicalValue <= 0.4,
  );
  const mediumElements = elements.filter(
    (element) => element.technicalValue > 0.4 && element.technicalValue <= 0.7,
  );
  const hardElements = elements.filter(
    (element) => element.technicalValue > 0.7,
  );

  return (
    <main className="space-y-12 p-4">
      <div className="mt-24 space-y-6 row-start-2">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-semibold tracking-tighter text-5xl">
            Pole Sport Codex
          </h1>
          <p className="text-balance text-center text-lg">
            An open, encyclopedia-style reference of competitive pole sport
            elements
          </p>
        </div>
        <SuggestionSearchBar />
      </div>

      <div className="space-y-7 row-start-3">
        <section>
          <h2 className="font-semibold text-xl mb-3">By category</h2>
          <div className="grid grid-cols-4 gap-4">
            <FilteredItem
              filters={["category=strength"]}
              media={<BicepsFlexed />}
              title="Strength elements"
              elementCount={strengthElements.length}
            />

            <FilteredItem
              filters={["category=flexibility"]}
              media={<LineSquiggle />}
              title="Flexibility elements"
              elementCount={flexibilityElements.length}
            />

            <FilteredItem
              filters={["category=static"]}
              media={<Lock />}
              title="Static elements"
              elementCount={staticElements.length}
            />

            <FilteredItem
              filters={["category=spin"]}
              media={<LoaderPinwheel />}
              title="Spin elements"
              elementCount={spinElements.length}
            />
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-3">By technical value</h2>
          <div className="grid grid-cols-3 gap-4">
            <FilteredItem
              filters={["tech_value_max=0.4"]}
              media="*"
              title="Less than 0.4 points"
              elementCount={easyElements.length}
            />

            <FilteredItem
              filters={["tech_value_min=0.4", "tech_value_max=0.7"]}
              media="**"
              title="Between 0.4 and 0.7 points"
              elementCount={mediumElements.length}
            />

            <FilteredItem
              filters={["tech_value_min=0.7"]}
              media="***"
              title="More than 0.7 points"
              elementCount={hardElements.length}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export function FilteredItem({
  media,
  filters,
  title,
  elementCount,
}: {
  media: React.ReactNode;
  filters: string[];
  title: string;
  elementCount: number;
}) {
  return (
    <Item asChild variant="outline">
      <Link href={`/elements?${filters.join("&")}`}>
        <ItemMedia variant="icon">{media}</ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
        </ItemContent>
        <ItemFooter className="text-muted-foreground text-xs">
          {elementCount} elements
        </ItemFooter>
      </Link>
    </Item>
  );
}
