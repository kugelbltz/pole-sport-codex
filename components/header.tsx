import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "flex justify-between items-center bg-background",
        className,
      )}
    >
      <Menu />
      <div className="flex">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          nativeButton={false}
          render={
            <Link
              href="https://github.com/kugelbltz/pole-sport-codex"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub />
            </Link>
          }
        ></Button>
      </div>
    </header>
  );
}

function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={
              <Link href="/">
                <BookOpen className="text-base size-5" />
              </Link>
            }
          />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={
              <Link className="font-medium" href="/elements">
                Elements
              </Link>
            }
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
