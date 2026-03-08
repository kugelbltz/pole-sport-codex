import ElementList from "@/components/element-card-list";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getElement, getElementCodes, getRandomElements } from "@/lib/elements";
import {
  BicepsFlexed,
  Check,
  Footprints,
  Grab,
  Hourglass,
  PersonStanding,
  Pointer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getElementCodes();
}

const fakeTags = ["Tag 1", "Tag 2", "Tag 3"];

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const element = getElement(code);

  if (!element) {
    notFound();
  }

  element.aliases = ["Alias 1", "Aliase 2"];

  return (
    <div className="p-4 grid gap-9">
      <section className="grid grid-cols-[auto_1fr] gap-10">
        <Card className="rounded-sm dark:bg-white h-min">
          <CardContent>
            <Image
              src={element.image}
              alt={element.name}
              width={400}
              height={400}
            />
          </CardContent>
        </Card>
        <div className="space-y-5">
          <header className="mb-8">
            <h1 className="font-semibold text-3xl">{element.name}</h1>
            {element.aliases && (
              <p className="text-sm text-muted-foreground italic">
                {`Aliases: ${element.aliases.join(", ")}`}
              </p>
            )}
          </header>
          <div className="grid grid-cols-3 gap-4">
            <MetadataCard label="Code" value={element.code} />
            <MetadataCard label="Category" value={element.category} />
            <MetadataCard
              label="Technical value"
              value={element.technicalValue}
            />
            <MetadataCard
              label="Difficulty"
              value={<Badge variant="destructive">Hard</Badge>}
            />
          </div>
          <div className="flex gap-2 items-center">
            {fakeTags.map((tag, index) => (
              <Badge
                key={`${tag}_${index}`}
                render={<Link href="#">{tag}</Link>}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          Criteria
        </h2>
        <Criteria criteria={element.criteria} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          Description
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in nisi
          in justo sagittis porttitor. Fusce dapibus, justo et pretium maximus,
          ligula massa fringilla felis, et ullamcorper diam leo vel lacus. Nunc
          pellentesque dapibus nisi vitae egestas. In sapien nulla, porttitor ac
          ligula non, hendrerit imperdiet odio. Pellentesque hendrerit elit at
          nisl ultricies viverra. Praesent ante mi, vulputate non ullamcorper
          ut, tempor in elit. Vestibulum semper risus rutrum odio egestas
          pharetra. Aliquam eleifend, lectus et aliquam egestas, tellus nibh
          accumsan quam, vitae tristique risus neque ut tellus. Nulla semper ut
          mi nec laoreet. Ut consectetur justo sit amet augue imperdiet tempor.
          Sed non purus in turpis congue tristique. Sed placerat dictum erat ut
          feugiat. Quisque tempor orci id purus porta, nec tempor quam
          ultricies. Integer faucibus quam non scelerisque varius. Suspendisse
          at velit vitae ligula interdum molestie in sit amet magna.
        </p>
      </section>
      <section className="overflow-hidden">
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          Videos
        </h2>
        <ScrollArea className="w-full p-4">
          <div className="flex space-x-4 ">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/3pyB7SRD84w?si=wwVohKnFT_vXGmp9"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/U5A7iDq2u9Q"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/U5A7iDq2u9Q"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/U5A7iDq2u9Q"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/U5A7iDq2u9Q"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/U5A7iDq2u9Q"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/U5A7iDq2u9Q"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          Related elements
        </h2>
        <ElementList elements={getRandomElements(10)} />
      </section>
    </div>
  );
}

function MetadataCard({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardDescription className="text-xs">{label}</CardDescription>
        <CardTitle className="text-lg font-semibold">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}

function Criteria({ criteria }: { criteria: Record<string, string> }) {
  return (
    <ItemGroup className="gap-3">
      {Object.entries(criteria).map(([crit, value]) => (
        <Criterion key={`${crit}`} type={crit} value={value} />
      ))}
    </ItemGroup>
  );
}

const criterionTypeIcon = {
  hold_the_position: <Hourglass />,
  points_of_contact: <Pointer />,
  arm_position: <BicepsFlexed />,
  grip: <Grab />,
  leg_position: <Footprints />,
  body_position: <PersonStanding />,
};

function Criterion({ type, value }: { type: string; value: string }) {
  return (
    <Item variant="outline">
      <ItemMedia className="text-muted-foreground">
        {criterionTypeIcon[type] ?? <Check />}
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="capitalize">
          {type.split("_").join(" ")}
        </ItemTitle>
        <ItemDescription>{value}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
