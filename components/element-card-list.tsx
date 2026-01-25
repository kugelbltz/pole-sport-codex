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

const elements = [
  {
    name: "Ballerina",
    code: "F4",
    image: "/38.jpg",
  },
  {
    name: "Janeiro",
    code: "S4",
    image: "/38.jpg",
  },
  {
    name: "Inside leg hang 1",
    code: "SP4",
    image: "/38.jpg",
  },

  {
    name: "Ballerina",
    code: "F5",
    image: "/38.jpg",
  },
  {
    name: "Janeiro",
    code: "S5",
    image: "/38.jpg",
  },
  {
    name: "Inside leg hang 1",
    code: "SP5",
    image: "/38.jpg",
  },

  {
    name: "Ballerina",
    code: "F6",
    image: "/38.jpg",
  },
  {
    name: "Janeiro",
    code: "S6",
    image: "/38.jpg",
  },
  {
    name: "Inside leg hang 1",
    code: "SP6",
    image: "/38.jpg",
  },
];

export default function ElementList() {
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
