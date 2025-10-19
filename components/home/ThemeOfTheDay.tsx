export type DailyTheme = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
};

type ThemeOfTheDayProps = {
  theme: DailyTheme;
  themes: DailyTheme[];
};

export default function ThemeOfTheDay({ theme, themes }: ThemeOfTheDayProps) {
  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 shadow-sm">
      <div
        className={`absolute inset-0 opacity-80 blur-2xl ${theme.accent}`}
        aria-hidden="true"
      />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-700">
          오늘의 테마
        </p>
        <h1 className="mt-3 text-3xl font-semibold">{theme.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{theme.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {theme.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-gray-700 shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between text-xs text-gray-600">
          <span>테마 더 보기</span>
          <div className="flex gap-2">
            {themes.map((candidate) => (
              <span
                key={candidate.id}
                className={`h-2 w-8 rounded-full bg-gray-200 ${candidate.id === theme.id ? "bg-gray-700" : ""}`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
