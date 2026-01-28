import Image from "next/image";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import Link from "next/link";
import { getElements } from "@/lib/elements";

export default function ElementList() {
  const elements = getElements();

  return (
    <ItemGroup className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {elements.map((element) => (
        <Item key={element.code} variant="outline" asChild>
          <Link href={`/elements/${element.code}`}>
            <ItemHeader>
              <Image
                src={element.image}
                alt={element.name}
                width={128}
                height={128}
                className="aspect-square w-full rounded-sm object-cover"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{element.name}</ItemTitle>
              <ItemDescription>{element.code}</ItemDescription>
            </ItemContent>
          </Link>
        </Item>
      ))}
    </ItemGroup>
  );
}
