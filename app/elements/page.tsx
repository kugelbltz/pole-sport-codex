"use client";

import ElementList from "@/components/element-card-list";
import { Filters, FiltersType } from "@/components/filters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { filterElements } from "@/lib/filter";
import { searchElements } from "@/lib/search";
import { ListFilter, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function ElementsPageContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const techValueMax = searchParams.get("tech_value_max");
  const techValueMin = searchParams.get("tech_value_min");

  const [query, setQuery] = React.useState("");
  const [filters, setFilters] = React.useState<FiltersType>({
    categories: category ? [category] : [],
    technicalValueRange: {
      min: techValueMin ? parseFloat(techValueMin) : 0.1,
      max: techValueMax ? parseFloat(techValueMax) : 1.0,
    },
  });

  const searched = searchElements(query);
  const filtered = filterElements(searched, {
    categories: filters.categories,
    maxTechnicalValue: filters.technicalValueRange.max,
    minTechnicalValue: filters.technicalValueRange.min,
  });

  const handleQueryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.trim();
    setQuery(trimmed);
  };

  const handleClearQuery = () => {
    setQuery("");
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-4 p-4">
      <aside className="hidden sm:block w-72">
        <Card className="gap-8">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <Filters filters={filters} onFiltersChanged={setFilters} />
          </CardContent>
        </Card>
      </aside>

      <main className="flex-1 flex flex-col gap-4">
        <header className="flex gap-1">
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              value={query}
              onChange={handleQueryChanged}
              placeholder={`Search ${filtered.length} elements...`}
            />
            {query && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Clear"
                  title="Clear"
                  size="icon-xs"
                  onClick={handleClearQuery}
                >
                  <X />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          <Sheet>
            <SheetTrigger
              className="sm:hidden"
              render={<Button size="icon-lg" variant="outline" />}
            >
              <ListFilter />
            </SheetTrigger>
            <SheetContent side="bottom" className="data-[side=bottom]:h-full">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="px-4">
                <Filters filters={filters} onFiltersChanged={setFilters} />
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <ScrollArea className="flex-[1_1_0] min-h-0">
          <ElementList elements={filtered} />
        </ScrollArea>
      </main>
    </div>
  );
}
export default function ElementsPage() {
  return (
    <Suspense fallback={"Loading..."}>
      <ElementsPageContent />
    </Suspense>
  );
}
