"use client";

import ElementList from "@/components/element-card-list";
import { useSearchParams } from "next/navigation";

export default function ElementsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const techValueTo = searchParams.get("tech_value_to");
  const techValueFrom = searchParams.get("tech_value_from");

  return (
    <div>
      <ul>
        <li>category: {category}</li>
        <li>techValueTo: {techValueTo}</li>
        <li>techValueFrom: {techValueFrom}</li>
      </ul>
      <ElementList />;
    </div>
  );
}
