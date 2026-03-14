import ElementList from "@/components/element-card-list";
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
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Criteria,
  loadElement,
  loadElementIndex,
  CriteriaType,
} from "@/lib/elements";
import {
  BicepsFlexed,
  Check,
  DraftingCompass,
  Footprints,
  Hourglass,
  PersonStanding,
  Play,
  Pointer,
} from "lucide-react";
import { ElementImage } from "@/components/element-image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const elements = loadElementIndex();
  return elements.map((element) => ({
    id: element.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const element = await loadElement(id);

  if (!element) {
    notFound();
  }

  return (
    <div className="p-4 grid gap-9">
      <section className="grid grid-cols-[auto_1fr] gap-10">
        <Card className="rounded-sm dark:bg-white h-min">
          <CardContent>
            <ElementImage id={element.id} width={400} height={400} />
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
            <MetadataCard label="Code" value={element.id} />
            <MetadataCard label="Category" value={element.category} />
            <MetadataCard
              label="Technical value"
              value={element.technicalValue}
            />
            <MetadataCard label="Format" value={element.format} />
            <MetadataCard label="Found in page" value={element.page} />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          Criteria
        </h2>
        <CriteriaList criteria={element.criteria} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          Tips
        </h2>

        {element.tips ? (
          <ul className="list-disc list-inside">
            {element.tips.map((tip, index) => (
              <li key={`tip-${index}`}>{tip}</li>
            ))}
          </ul>
        ) : (
          <p className="text-center italic text-muted-foreground text-lg">
            No tips
          </p>
        )}
      </section>
      <section className="overflow-hidden">
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          Videos
        </h2>
        {element.videos ? (
          <ScrollArea className="w-full p-4">
            <div className="flex space-x-4 ">
              {element.videos.map((video, index) => (
                <ElementVideo key={`video-${index}`} url={video.url} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <p className="text-center italic text-muted-foreground text-lg">
            No videos
          </p>
        )}
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          Related elements
        </h2>
        {element.relatedMoves ? (
          <RelatedElements elementIds={element.relatedMoves} />
        ) : (
          <p className="text-center italic text-muted-foreground text-lg">
            No related elements
          </p>
        )}
      </section>
    </div>
  );
}

async function RelatedElements({ elementIds }: { elementIds: string[] }) {
  const elements = await Promise.all(elementIds.map((id) => loadElement(id)));

  return <ElementList elements={elements} />;
}

function ElementVideo({ url }: { url: string }) {
  return (
    <Suspense fallback={<p>Loading video...</p>}>
      <iframe
        width="560"
        height="315"
        src={url}
        title="YouTube"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </Suspense>
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

function CriteriaList({ criteria }: { criteria: Criteria }) {
  return (
    <ItemGroup className="gap-3">
      {criteria.map((criterion) => (
        <Criterion
          key={criterion.type}
          type={criterion.type}
          value={criterion.items.join(", ")}
        />
      ))}
    </ItemGroup>
  );
}

const criterionTypeIcon = {
  hold: <Hourglass />,
  points_of_contact: <Pointer />,
  arm_grip: <BicepsFlexed />,
  leg_position: <Footprints />,
  angle_of_split: <DraftingCompass />,
  body_position: <PersonStanding />,
  starting_position: <Play />,
  unknown: <Check />,
};

function Criterion({ type, value }: { type: CriteriaType; value: string }) {
  return (
    <Item variant="outline">
      <ItemMedia className="text-muted-foreground">
        {criterionTypeIcon[type]}
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
