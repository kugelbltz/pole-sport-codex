import { BookOpen } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 min-w-fit">
        <BookOpen className="size-5 md:size-6" />
        <span className="text-lg md:text-xl font-semibold tracking-tight ">
          Pole Sport Codex
        </span>
      </div>
    </Link>
  );
}
