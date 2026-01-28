"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { getRandomElementCode } from "@/lib/elements";
import {
  ArrowRight,
  BicepsFlexed,
  Dices,
  LineSquiggle,
  LoaderPinwheel,
  Lock,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRandomClicked = () => {
    const randomCode = getRandomElementCode();
    router.push(`/elements/${randomCode}`);
  };

  return (
    <div className="space-y-12 p-4">
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
        <div className="flex gap-2">
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput />
          </InputGroup>
          <Button onClick={handleRandomClicked} variant="outline" size="icon">
            <Dices />
          </Button>
        </div>
      </div>

      <div className="space-y-7 row-start-3">
        <section>
          <h2 className="font-semibold text-xl mb-3">By category</h2>
          <div className="grid grid-cols-5 gap-4">
            <Item asChild variant="outline">
              <Link href="/elements?category=strength">
                <ItemMedia variant="icon">
                  <BicepsFlexed />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Strength elements</ItemTitle>
                </ItemContent>
                <ItemFooter>245 elements</ItemFooter>
              </Link>
            </Item>

            <Item asChild variant="outline">
              <Link href="/elements?category=flexibility">
                <ItemMedia variant="icon">
                  <LineSquiggle />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Flexibility elements</ItemTitle>
                </ItemContent>
                <ItemFooter>245 elements</ItemFooter>
              </Link>
            </Item>

            <Item asChild variant="outline">
              <Link href="/elements?category=static">
                <ItemMedia variant="icon">
                  <Lock />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Static elements</ItemTitle>
                </ItemContent>
                <ItemFooter>245 elements</ItemFooter>
              </Link>
            </Item>

            <Item asChild variant="outline">
              <Link href="/elements?category=spin">
                <ItemMedia variant="icon">
                  <LoaderPinwheel />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Spin elements</ItemTitle>
                </ItemContent>
                <ItemFooter>245 elements</ItemFooter>
              </Link>
            </Item>

            <Item asChild variant="muted">
              <Link href="/elements">
                <ItemContent>
                  <ItemTitle>View all</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <ArrowRight className="size-5 text-muted-foreground" />
                </ItemActions>
              </Link>
            </Item>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-3">By technical value</h2>
          <div className="grid grid-cols-4 gap-4">
            <Item asChild variant="outline">
              <Link href="/elements?tech_value_to=0.5">
                <ItemMedia variant="icon">*</ItemMedia>
                <ItemContent>
                  <ItemTitle>Less than 0.5 points</ItemTitle>
                </ItemContent>
                <ItemFooter>245 elements</ItemFooter>
              </Link>
            </Item>

            <Item asChild variant="outline">
              <Link href="/elements?tech_value_from=0.5&tech_value_to=0.8">
                <ItemMedia variant="icon">**</ItemMedia>
                <ItemContent>
                  <ItemTitle>Between 0.5 and 0.8 points</ItemTitle>
                </ItemContent>
                <ItemFooter>245 elements</ItemFooter>
              </Link>
            </Item>

            <Item asChild variant="outline">
              <Link href="/elements?tech_value_from=0.8">
                <ItemMedia variant="icon">***</ItemMedia>
                <ItemContent>
                  <ItemTitle>More that 0.8 points</ItemTitle>
                </ItemContent>
                <ItemFooter>245 elements</ItemFooter>
              </Link>
            </Item>

            <Item asChild variant="muted">
              <Link href="/elements">
                <ItemContent>
                  <ItemTitle>View all</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <ArrowRight className="size-5 text-muted-foreground" />
                </ItemActions>
              </Link>
            </Item>
          </div>
        </section>
      </div>
    </div>
  );
}
