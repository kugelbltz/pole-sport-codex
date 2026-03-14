import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { AppMenu } from "./app-nav-menu";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { SiGithub } from "@icons-pack/react-simple-icons";

export function AppSidebar() {
  return (
    <Sheet>
      <SheetTrigger
        className="md:hidden"
        render={
          <Button size="icon" variant="ghost">
            <Menu />
          </Button>
        }
      />
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <AppMenu />
        </div>
        <SheetFooter>
          <Button
            variant="ghost"
            nativeButton={false}
            render={
              <Link
                href="https://github.com/kugelbltz/pole-sport-codex"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGithub /> <span>GitHub</span>
              </Link>
            }
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
