import PaletteSwatch from "@/components/home/PaletteSwatch";

export type WeeklyTemplate = {
  id: string;
  title: string;
  description: string;
  tone: string;
  colors: string[];
};

type WeeklyTemplatesProps = {
  templates: WeeklyTemplate[];
};

export default function WeeklyTemplates({ templates }: WeeklyTemplatesProps) {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">이주의 템플릿</h2>
        <button className="text-xs font-medium text-indigo-500">전체 템플릿</button>
      </div>
      <div className="mt-4 grid gap-4">
        {templates.map((template) => (
          <article key={template.id} className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{template.title}</p>
                <p className="mt-1 text-[11px] text-gray-500">{template.tone}</p>
              </div>
              <PaletteSwatch colors={template.colors} />
            </div>
            <p className="mt-3 text-xs leading-5 text-gray-600">{template.description}</p>
            <button className="mt-4 w-full rounded-full bg-gray-900 py-2 text-sm font-medium text-white shadow-sm">
              템플릿으로 시작하기
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
