import Link from "next/link";

export type RecommendedQuote = {
  id: number | string;
  text: string;
  author: string;
  era: string;
};

type RecommendedQuotesProps = {
  quotes: RecommendedQuote[];
};

export default function RecommendedQuotes({ quotes }: RecommendedQuotesProps) {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">추천 명언</h2>
        <button className="text-xs font-medium text-indigo-500">전체보기</button>
      </div>
      <div className="mt-4 grid gap-4">
        {quotes.map((quote) => (
          <article
            key={quote.id}
            className="space-y-3 rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-base font-semibold leading-6">{quote.text}</p>
            <p className="text-xs text-gray-500">
              {quote.author} · {quote.era}
            </p>
            <Link
              href="/create"
              className="inline-flex w-full items-center justify-center rounded-full bg-gray-900 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
            >
              명언 카드 만들기
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
