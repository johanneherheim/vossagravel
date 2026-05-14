import { Markdown } from "@/components/markdown";
import { type Page as PageType } from "@/types/Page";
import { getPage } from "@/sanity/sanity-utils";
import GpxMapWrapper from "@/components/gpx-map-wrapper";
import { Download } from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const page: PageType | null = await getPage(slug);

  return (
    <div className="px-3 py-20 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-4xl font-semibold mb-5">{page?.title}</h1>
      {page && page.content ? (
        <>
          <Markdown content={page.content} />

          {page.gpx?.[0]?.asset?.url && (
            <div className="mt-8 flex flex-col gap-4">
              <a
                href={page.gpx[0].asset.url}
                download
                className="w-fit rounded-md bg-black px-5 py-2 text-white hover:bg-gray-800"
              >
                <div className="flex gap-5 items-center">
                  <p>Last ned GPX-fil</p>
                  <Download className="size-5" />
                </div>
              </a>

              <GpxMapWrapper gpxUrl={page.gpx[0].asset.url} />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-8 my-10">
          <h3 className="text-xl font-medium">Ingenting her endå ...</h3>
          <iframe
            src="https://giphy.com/embed/IsYt1rfEu0Zv1FjK19"
            className="sm:w-120 sm:h-70"
          />
        </div>
      )}
    </div>
  );
}
