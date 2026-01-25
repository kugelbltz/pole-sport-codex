import ElementList from "@/components/element-card-list";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Dices, Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-6 mx-auto max-w-384">
      <Header className="h-14 sticky top-0 z-50" />
      <main className="mt-10 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-semibold tracking-tighter text-5xl">
              Pole Sport Codex
            </h1>
            <p className="text-balance text-center text-lg">
              An open, encyclopedia-style reference of competitive pole sport
              elements
            </p>
          </div>
          <div className="flex gap-2 max-">
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput />
            </InputGroup>
            <Button asChild variant="outline" size="icon">
              <Link href="/elements/random">
                <Dices />
              </Link>
            </Button>
          </div>
        </div>
        <ElementList />
      </main>
    </div>
  );
}
