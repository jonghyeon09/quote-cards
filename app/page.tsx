import ThemeOfTheDay, { DailyTheme } from '@/components/home/ThemeOfTheDay';
import RecommendedQuotes, {
  RecommendedQuote,
} from '@/components/home/RecommendedQuotes';
import TrendingAuthors, {
  TrendingAuthor,
} from '@/components/home/TrendingAuthors';
import RecentCreations, {
  RecentCreation,
} from '@/components/home/RecentCreations';
import WeeklyTemplates, {
  WeeklyTemplate,
} from '@/components/home/WeeklyTemplates';
import SearchExplore, {
  ExploreHighlight,
  FilterGroup,
} from '@/components/home/SearchExplore';
import { quotes } from '@/data/quotes';

const dailyThemes: DailyTheme[] = [
  {
    id: 'monday-motivation',
    title: '월요동기',
    description:
      '느슨해진 루틴을 다시 붙잡을 시간. 오늘은 당신의 의지가 가장 빛나요.',
    tags: ['새로운 시작', '집중'],
    accent: 'from-orange-100 to-rose-100',
  },
  {
    id: 'healing',
    title: '힐링',
    description:
      '다정한 단어가 마음의 파도를 잠재워요. 스스로를 토닥여 주세요.',
    tags: ['휴식', '자기돌봄'],
    accent: 'from-teal-100 to-sky-100',
  },
  {
    id: 'focus',
    title: '집중',
    description: '산만함을 잠시 멈추고, 한 문장에 몰입해 보세요.',
    tags: ['몰입', '심화'],
    accent: 'from-violet-100 to-indigo-100',
  },
];

const themeOfTheDay = dailyThemes[0];

const recommendedQuotes: RecommendedQuote[] = quotes
  .filter((quote) => quote.categories.includes('동기'))
  .slice(0, 3)
  .map((quote) => ({
    id: quote.id,
    text: quote.text,
    author: quote.author,
    era: quote.era ?? '현대',
  }));

const authorHighlights: Record<string, string> = {
  아리스토텔레스: '균형과 덕목의 조언',
  '벨 훅스': '사랑과 관계에 대한 통찰',
  '넬슨 만델라': '용기와 화합의 언어',
  루미: '영감과 관조의 시',
};

const trendingAuthorNames = [
  '아리스토텔레스',
  '벨 훅스',
  '넬슨 만델라',
  '루미',
];

const trendingAuthors: TrendingAuthor[] = trendingAuthorNames
  .map((name) => {
    const representativeQuote = quotes.find((quote) => quote.author === name);
    if (!representativeQuote) {
      return null;
    }
    return {
      id: name,
      name,
      highlight: authorHighlights[name] ?? '',
      sampleQuote: representativeQuote.text,
    };
  })
  .filter((author): author is TrendingAuthor => Boolean(author));

const recentCreations: RecentCreation[] = [
  {
    id: 'calm-morning',
    title: '차분한 월요일',
    mood: '힐링 · 한국어',
    updated: '2시간 전',
    palette: ['#FEE2E2', '#F4F4F5', '#F97316'],
  },
  {
    id: 'bold-focus',
    title: '집중 모드',
    mood: '동기 · 영어',
    updated: '어제',
    palette: ['#E0E7FF', '#EEF2FF', '#6366F1'],
  },
  {
    id: 'night-notes',
    title: '밤의 기록',
    mood: '지혜 · 한국어',
    updated: '3일 전',
    palette: ['#F3E8FF', '#EDE9FE', '#8B5CF6'],
  },
];

const weeklyTemplates: WeeklyTemplate[] = [
  {
    id: 'sunrise',
    title: 'Sunrise Gradient',
    description: '따뜻한 그라데이션과 라운드 타이포로 활력을 주는 스타터 카드.',
    tone: '동기 · 짧은 문장',
    colors: ['#FFEDD5', '#FED7AA', '#FB923C'],
  },
  {
    id: 'linen-notes',
    title: 'Linen Notes',
    description:
      '천 질감과 부드러운 파스텔로 담담한 힐링 메시지를 담기 좋아요.',
    tone: '힐링 · 보통 길이',
    colors: ['#F5F5F4', '#E7E5E4', '#A8A29E'],
  },
];

const quickFilterGroups: FilterGroup[] = [
  {
    group: '카테고리',
    items: ['힐링', '동기', '관계', '집중', '행운', '지혜', '성공', '사랑'],
  },
  {
    group: '저자',
    items: ['공자', '마하트마 간디', '헨리 포드', '버지니아 울프'],
  },
  {
    group: '톤',
    items: ['따뜻한', '단호한', '위트있는'],
  },
  {
    group: '언어',
    items: ['한국어', 'English'],
  },
];

const sortOptions = ['인기', '최신', '짧은 문장 우선'];

const searchHighlightQuote = quotes.find(
  (quote) => quote.id === 'aristotle-hope'
);

const searchHighlight: ExploreHighlight = searchHighlightQuote
  ? {
      text: searchHighlightQuote.text,
      meta: `${searchHighlightQuote.author} · ${searchHighlightQuote.era ?? '추천'}`,
    }
  : {
      text: '원하는 명언을 검색해 보세요.',
      meta: '추천 결과',
    };

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-8 bg-[#F9FAFB] px-4 pb-24 pt-10 text-gray-900">
      <ThemeOfTheDay theme={themeOfTheDay} themes={dailyThemes} />
      <RecommendedQuotes quotes={recommendedQuotes} />
      <TrendingAuthors authors={trendingAuthors} />
      <RecentCreations creations={recentCreations} />
      <WeeklyTemplates templates={weeklyTemplates} />
      <SearchExplore
        filterGroups={quickFilterGroups}
        sortOptions={sortOptions}
        searchPlaceholder="예: 일상 집중, 사랑, 용기"
        highlight={searchHighlight}
      />
    </main>
  );
}
