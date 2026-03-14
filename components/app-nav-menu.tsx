import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AppMenu({ className }: { className?: string }) {
  return (
    <NavigationMenu orientation="vertical" className={cn("", className)}>
      <NavigationMenuList className="flex-col items-start md:flex-row">
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
