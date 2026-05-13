import { Markdown } from "@/components/markdown";
import { type Page as PageType } from "@/types/Page";
import { getPage } from "@/sanity/sanity-utils";

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
        <Markdown content={page.content} />
      ) : (
        <div className="flex flex-col gap-8 my-10">
          <h3 className="text-xl font-medium">Ingenting her endå ...</h3>
          <iframe
            src="https://giphy.com/embed/IsYt1rfEu0Zv1FjK19"
            className="sm:w-[480px] sm:h-[269px]"
          />
        </div>
      )}
    </div>
  );
}
