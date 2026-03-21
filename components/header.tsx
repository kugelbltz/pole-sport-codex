import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";
import { AppMenu } from "./app-nav-menu";
import { Logo } from "./logo";
import { SidebarTrigger } from "./ui/sidebar";
import { Menu } from "lucide-react";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "grid grid-cols-[auto_1fr_auto] justify-items-center md:flex md:justify-between items-center bg-background",
        className,
      )}
    >
      <SidebarTrigger
        className="md:hidden"
        render={
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        }
      />

      <Logo />
      <div className="md:flex md:gap-8 md:items-center">
        <AppMenu className="hidden md:block" />
        <div className="flex">
          <ThemeToggle />
          <Button
            className="hidden md:flex"
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
          />
        </div>
      </div>
    </header>
  );
}
