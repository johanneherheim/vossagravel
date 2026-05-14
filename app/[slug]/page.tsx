import { Markdown } from "@/components/markdown";
import { type Page as PageType } from "@/types/Page";
import { getPage } from "@/sanity/sanity-utils";
import GpxMapWrapper from "@/components/gpx-map-wrapper";
import { Download } from "lucide-react";
import picture from "@/components/images/loype.jpg";
import traffic from "@/components/images/vakt.jpg";
import Image from "next/image";

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
      {page?.slug === "loypa" && (
        <div className="relative overflow-hidden lg:max-w-3/4 rounded-lg mb-5">
          <Image
            src={picture}
            alt="Vossagravel landscape"
            width={1000}
            height={600}
            className="rounded-lg"
          />

          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 rounded bg-white/80 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm shadow">
            <div className="items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500" />
                <span>stisegment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span>grusveg/skiløype/kjerreveg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {page?.slug === "trafikkinfo" && (
        <div className="relative overflow-hidden lg:max-w-3/4 rounded-lg mb-5">
          <Image
            src={traffic}
            alt="Vossagravel landscape"
            width={1000}
            height={600}
            className="rounded-lg"
          />
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 rounded bg-white/80 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm shadow">
            <div className="items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500" />
                <span>stisegment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span>grusveg/skiløype/kjerreveg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {page && page.content ? (
        <>
          <Markdown content={page.content} />

          {page.gpx?.[0]?.asset?.url && (
            <div className="mt-8 flex flex-col gap-4 lg:max-w-3/4">
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
