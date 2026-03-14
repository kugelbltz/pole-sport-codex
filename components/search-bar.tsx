"use client";

import { Command as CommandPrimitive } from "cmdk";
import { Button } from "./ui/button";
import { Dices, Search, X } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useRouter } from "next/navigation";
import { CommandItem, CommandList, CommandShortcut } from "./ui/command";
import { ElementIndex, getRandomElementCode } from "@/lib/elements";
import { searchElements } from "@/lib/search";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onQueryChanged?: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  onQueryChanged,
  placeholder,
  ...props
}: SearchBarProps & React.ComponentProps<typeof InputGroup>) {
  const [query, setQuery] = React.useState("");

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const trimmed = query.trim();
      if (!trimmed) return;

      onSearch?.(trimmed);
    }
  };

  const handleClearQuery: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setQuery("");
    onQueryChanged?.("");
  };

  const handleQueryChanged: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setQuery(e.target.value);
    onQueryChanged?.(e.target.value);
  };

  return (
    <InputGroup {...props}>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        value={query}
        onChange={handleQueryChanged}
        onKeyDown={handleOnKeyDown}
        placeholder={placeholder}
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
  );
}

export const SuggestionSearchBar = () => {
  const router = useRouter();
  const [suggestions, setSuggestions] = React.useState<ElementIndex>([]);

  const handleOnSearch = (query: string) => {
    router.push(`/elements?search=${query}`);
  };

  const handleQueryChanged = (query: string) => {
    if (!query) return setSuggestions([]);

    const newSuggestions = searchElements(query);

    setSuggestions(newSuggestions);
  };

  const handleRandomClicked = () => {
    const randomCode = getRandomElementCode();
    router.push(`/elements/${randomCode}`);
  };

  return (
    <div className="flex gap-1 items-start">
      {/*So that the first item is not selected by default*/}
      <CommandPrimitive className="w-full" shouldFilter={false}>
        <Popover open={suggestions.length > 0}>
          <PopoverTrigger
            nativeButton={false}
            render={
              <CommandPrimitive.Input asChild>
                <SearchBar
                  onSearch={handleOnSearch}
                  onQueryChanged={handleQueryChanged}
                />
              </CommandPrimitive.Input>
            }
          />

          <PopoverContent
            initialFocus={false}
            align="start"
            className="w-(--anchor-width)"
          >
            <CommandList>
              <CommandItem value={`-`} className="hidden" />
              {suggestions.map((element) => (
                <CommandItem
                  key={element.id}
                  value={element.id}
                  keywords={[element.name]}
                  onSelect={(item) => {
                    router.push(`/elements/${item}`);
                  }}
                >
                  {element.name}
                  <CommandShortcut>{element.id}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandList>
          </PopoverContent>
        </Popover>
      </CommandPrimitive>
      <Button size="icon-lg" variant="outline" onClick={handleRandomClicked}>
        <Dices />
      </Button>
    </div>
  );
};
