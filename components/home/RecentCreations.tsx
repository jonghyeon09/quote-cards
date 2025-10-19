import PaletteSwatch from "@/components/home/PaletteSwatch";

export type RecentCreation = {
  id: string;
  title: string;
  mood: string;
  updated: string;
  palette: string[];
};

type RecentCreationsProps = {
  creations: RecentCreation[];
};

export default function RecentCreations({ creations }: RecentCreationsProps) {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">최근 제작본</h2>
        <button className="text-xs font-medium text-indigo-500">전체보기</button>
      </div>
      <div className="mt-4 grid gap-4">
        {creations.map((card) => (
          <article key={card.id} className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold">{card.title}</p>
                <p className="mt-1 text-[11px] text-gray-500">{card.mood}</p>
              </div>
              <PaletteSwatch colors={card.palette} />
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-gray-500">
              <span>마지막 수정 · {card.updated}</span>
              <button className="text-xs font-semibold text-indigo-500">재편집</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
