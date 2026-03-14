import { getElementImagePath } from "@/lib/elements";
import Image from "next/image";
import React from "react";

export function ElementImage({
  id,
  ...props
}: { id: string } & Omit<React.ComponentProps<typeof Image>, "src" | "alt">) {
  const path = getElementImagePath(id);
  return <Image alt={`${id}`} src={path} {...props} />;
}
