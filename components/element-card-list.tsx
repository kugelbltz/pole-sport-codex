import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import Link from "next/link";
import { Element, ElementIndexEntry } from "@/lib/elements";
import { ElementImage } from "./element-image";

export default function ElementList({
  elements,
}: {
  elements: ElementIndexEntry[] | Element[];
}) {
  return elements.length > 0 ? (
    <ItemGroup className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {elements.map((element) => (
        <ElementItem key={element.id} element={element} />
      ))}
    </ItemGroup>
  ) : (
    <p className="text-center italic text-muted-foreground text-lg">
      No elements
    </p>
  );
}

function ElementItem({ element }: { element: ElementIndexEntry | Element }) {
  return (
    <Item variant="outline" asChild>
      <Link href={`/elements/${element.id}`}>
        <ItemHeader>
          <ElementImage
            id={element.id}
            width={128}
            height={128}
            className="aspect-square w-full rounded-sm object-cover"
          />
        </ItemHeader>
        <ItemContent>
          <ItemTitle>{element.name}</ItemTitle>
          <ItemDescription>{element.id}</ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
