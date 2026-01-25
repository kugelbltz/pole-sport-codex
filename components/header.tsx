import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Book, BookOpen } from "lucide-react";
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
        <Button variant="ghost" size="icon" asChild>
          <Link
            href="https://github.com/kugelbltz/pole-sport-codex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub />
          </Link>
        </Button>
      </div>
    </header>
  );
}

function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">
              <BookOpen className="text-base size-6" />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className="font-semibold" href="/elements">
              Elements
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
