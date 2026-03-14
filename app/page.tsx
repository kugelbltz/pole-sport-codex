"use client";

import { SuggestionSearchBar } from "@/components/search-bar";
import {
  Item,
  ItemContent,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { countElements } from "@/lib/count";
import { loadElementIndex } from "@/lib/elements";
import { BicepsFlexed, LineSquiggle, LoaderPinwheel, Lock } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const elements = loadElementIndex();
  const counts = countElements(elements);

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
            <ElementGroupItem
              filters={["category=strength"]}
              media={<BicepsFlexed />}
              title="Strength elements"
              elementCount={counts.categories.strength}
            />

            <ElementGroupItem
              filters={["category=flexibility"]}
              media={<LineSquiggle />}
              title="Flexibility elements"
              elementCount={counts.categories.flexibility}
            />

            <ElementGroupItem
              filters={["category=static"]}
              media={<Lock />}
              title="Static elements"
              elementCount={counts.categories.static}
            />

            <ElementGroupItem
              filters={["category=spin"]}
              media={<LoaderPinwheel />}
              title="Spin elements"
              elementCount={counts.categories.spin}
            />
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-3">By technical value</h2>
          <div className="grid grid-cols-3 gap-4">
            <ElementGroupItem
              filters={["tech_value_max=0.4"]}
              media="*"
              title="Less than 0.4 points"
              elementCount={counts.difficulty.easy}
            />

            <ElementGroupItem
              filters={["tech_value_min=0.4", "tech_value_max=0.7"]}
              media="**"
              title="Between 0.4 and 0.7 points"
              elementCount={counts.difficulty.medium}
            />

            <ElementGroupItem
              filters={["tech_value_min=0.7"]}
              media="***"
              title="More than 0.7 points"
              elementCount={counts.difficulty.hard}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export function ElementGroupItem({
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
