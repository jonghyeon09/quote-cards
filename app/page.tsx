'use client';

import { useEffect, useMemo, useState } from 'react';

type Quote = {
  id: string;
  text: string;
  author: string;
  tags?: string[];
};

type RecentEdit = {
  id: string;
  title: string;
  preview: string;
  updatedAt: string; // ISO string
};

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-sm text-foreground/70 mt-1">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <article className="rounded-xl border border-foreground/10 bg-background shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5">
      <p className="text-sm sm:text-base leading-relaxed">“{quote.text}”</p>
      <div className="mt-3 text-right text-sm text-foreground/70">
        — {quote.author}
      </div>
      {quote.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {quote.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/70"
            >
              #{t}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function RecentCard({ item }: { item: RecentEdit }) {
  const date = useMemo(() => new Date(item.updatedAt), [item.updatedAt]);
  const formatted = useMemo(
    () =>
      `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}.${String(date.getDate()).padStart(2, '0')}`,
    [date]
  );
  return (
    <article className="rounded-xl border border-foreground/10 bg-background p-4 sm:p-5 hover:bg-foreground/5 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-medium text-foreground">{item.title}</h4>
          <p className="mt-1 text-sm text-foreground/70 line-clamp-2">
            {item.preview}
          </p>
        </div>
        <span className="text-xs text-foreground/60 whitespace-nowrap">
          {formatted}
        </span>
      </div>
    </article>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<RecentEdit[]>([]);

  // 데모용 추천/트렌딩 더미 데이터
  const recommended: Quote[] = [
    {
      id: 'r1',
      text: '위대한 일은 작은 일들의 연속이다.',
      author: '빈센트 반 고흐',
      tags: ['영감', '꾸준함'],
    },
    {
      id: 'r2',
      text: '성공은 준비와 기회의 만남이다.',
      author: '세네카',
      tags: ['성공', '준비'],
    },
    {
      id: 'r3',
      text: '느리더라도 멈추지 마라.',
      author: '공자',
      tags: ['꾸준함'],
    },
  ];

  const trending: Quote[] = [
    {
      id: 't1',
      text: '당신이 할 수 있다고 믿든 할 수 없다고 믿든, 믿는 대로 된다.',
      author: '헨리 포드',
      tags: ['자신감'],
    },
    {
      id: 't2',
      text: '오늘 걷지 않으면 내일 뛰어야 한다.',
      author: '작자 미상',
      tags: ['동기부여'],
    },
    {
      id: 't3',
      text: '지금이 가장 늦었다고 생각할 때가 가장 빠르다.',
      author: '박명수',
      tags: ['시작'],
    },
    {
      id: 't4',
      text: '행동은 모든 성공의 기초다.',
      author: '파블로 피카소',
      tags: ['행동'],
    },
  ];

  // 최근 편집 항목 로드 (localStorage)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('recentEdits');
      if (!raw) return;
      const parsed = JSON.parse(raw) as RecentEdit[];
      if (Array.isArray(parsed)) setRecent(parsed);
    } catch {
      // ignore JSON error
    }
  }, []);

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;
    // 검색 라우트는 이후 구현 예정. 우선 쿼리 상태만 유지
  }

  return (
    <main className="min-h-dvh">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* 헤더 */}
        <header className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            명언 카드 만들기
          </h1>
          <p className="mt-2 text-foreground/70 text-sm sm:text-base">
            검색하고 템플릿을 조합해 나만의 명언 카드를 만들고, 저장하고,
            공유하세요.
          </p>
        </header>

        {/* 검색 */}
        <section className="mb-10">
          <form onSubmit={onSearchSubmit} className="flex items-center gap-2">
            <label htmlFor="quote-search" className="sr-only">
              명언 검색
            </label>
            <input
              id="quote-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="명언, 작가, 태그 검색..."
              className="w-full rounded-lg border border-foreground/15 bg-background px-4 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-foreground/30"
            />
            <button
              type="submit"
              className="rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90"
            >
              검색
            </button>
          </form>
        </section>

        {/* 오늘의 추천 */}
        <section className="mb-12">
          <SectionHeader
            title="오늘의 추천"
            subtitle="오늘의 영감을 위한 큐레이션"
          />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {recommended.map((q) => (
              <QuoteCard key={q.id} quote={q} />
            ))}
          </div>
        </section>

        {/* 트렌딩 */}
        <section className="mb-12">
          <SectionHeader title="트렌딩" subtitle="지금 인기 있는 명언" />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {trending.map((q) => (
              <QuoteCard key={q.id} quote={q} />
            ))}
          </div>
        </section>

        {/* 최근 편집 */}
        <section className="mb-6">
          <SectionHeader
            title="최근 편집"
            subtitle="최근에 작업한 카드들"
            action={
              <button
                type="button"
                className="text-sm rounded-lg border border-foreground/20 px-3 py-1.5 hover:bg-foreground/5"
                onClick={() => {
                  // 데모용 더미 데이터 추가 (없을 때만)
                  if (recent.length) return;
                  const demo: RecentEdit[] = [
                    {
                      id: 'c1',
                      title: '월요일 출근용 동기 부여 카드',
                      preview: '오늘 걷지 않으면 내일 뛰어야 한다.',
                      updatedAt: new Date().toISOString(),
                    },
                    {
                      id: 'c2',
                      title: '팀 뉴스레터 카드',
                      preview: '행동은 모든 성공의 기초다.',
                      updatedAt: new Date(Date.now() - 86400000).toISOString(),
                    },
                  ];
                  localStorage.setItem('recentEdits', JSON.stringify(demo));
                  setRecent(demo);
                }}
              >
                샘플 추가
              </button>
            }
          />
          {recent.length === 0 ? (
            <div className="mt-4 rounded-xl border border-foreground/10 p-6 text-sm text-foreground/70">
              최근 편집한 카드가 없습니다. 상단 검색으로 시작하거나, 템플릿을
              선택해 보세요.
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {recent.map((item) => (
                <RecentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
