export type TrendingAuthor = {
  id: string;
  name: string;
  highlight: string;
  sampleQuote: string;
};

type TrendingAuthorsProps = {
  authors: TrendingAuthor[];
};

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((chunk) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TrendingAuthors({ authors }: TrendingAuthorsProps) {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">트렌딩 저자</h2>
        <button className="text-xs font-medium text-indigo-500">탐색</button>
      </div>
      <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {authors.map((author) => (
          <article
            key={author.id}
            className="min-w-[220px] snap-start rounded-3xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                {initialsFromName(author.name)}
              </div>
              <div>
                <p className="text-sm font-semibold">{author.name}</p>
                <p className="text-[11px] text-gray-500">{author.highlight}</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-gray-600">“{author.sampleQuote}”</p>
            <button className="mt-4 w-full rounded-full border border-gray-200 py-2 text-xs font-semibold text-gray-700">
              명언 모아보기
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
