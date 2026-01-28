import { getElement, getElementCodes } from "@/lib/elements";

export async function generateStaticParams() {
  return getElementCodes();
}

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const element = getElement(code);

  return <h2>{JSON.stringify(element)}</h2>;
}
