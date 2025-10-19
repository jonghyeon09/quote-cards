import Link from "next/link";
import FilterChip from "@/components/home/FilterChip";

export type FilterGroup = {
  group: string;
  items: string[];
};

export type ExploreHighlight = {
  text: string;
  meta: string;
};

type SearchExploreProps = {
  filterGroups: FilterGroup[];
  sortOptions: string[];
  searchPlaceholder: string;
  highlight: ExploreHighlight;
};

export default function SearchExplore({
  filterGroups,
  sortOptions,
  searchPlaceholder,
  highlight,
}: SearchExploreProps) {
  return (
    <section className="rounded-3xl border border-dashed border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">검색 & 탐색</h2>
          <p className="mt-1 text-xs text-gray-500">
            원하는 필터, 정렬로 맞는 명언을 찾아보세요.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-3">
          <span className="text-sm text-gray-500">검색</span>
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            className="text-xs font-semibold text-indigo-500 transition hover:text-indigo-600"
          >
            검색
          </button>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-gray-600">
          <span>정렬</span>
          <div className="flex gap-2">
            {sortOptions.map((option) => (
              <button
                key={option}
                type="button"
                className="rounded-full bg-gray-100 px-3 py-1 text-[11px] transition hover:bg-gray-200"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {filterGroups.map((group) => (
            <div key={group.group} className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                {group.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <FilterChip key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-xs font-semibold text-gray-600">추천 결과</p>
          <div className="mt-3 space-y-2">
            <p className="text-sm font-semibold leading-6">{highlight.text}</p>
            <p className="text-[11px] text-gray-500">{highlight.meta}</p>
          </div>
          <Link
            href="/create"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-indigo-500 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-600"
          >
            이 명언으로 카드 만들기
          </Link>
        </div>
      </div>
    </section>
  );
}
