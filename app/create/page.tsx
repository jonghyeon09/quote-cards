'use client';

import { useEffect, useMemo, useState } from 'react';

type TabId = 'background' | 'template' | 'text' | 'detail' | 'complete';

type Tab = {
  id: TabId;
  label: string;
  helper: string;
};

type BackgroundOption = {
  id: string;
  label: string;
  description: string;
  className: string;
  textClass: string;
  borderClass?: string;
};

type TemplateOption = {
  id: string;
  label: string;
  description: string;
  containerClass: string;
  contentClass: string;
  accentPlacement: 'top' | 'bottom' | 'left' | 'none';
};

type RatioOption = {
  id: string;
  label: string;
  aspectRatio: string;
  description: string;
};

const editingTabs: Tab[] = [
  {
    id: 'background',
    label: '배경',
    helper: '카드에 어울리는 분위기를 골라보세요.',
  },
  {
    id: 'template',
    label: '템플릿',
    helper: '문장을 담을 레이아웃을 선택할 수 있어요.',
  },
  {
    id: 'text',
    label: '텍스트',
    helper: '명언과 작가를 직접 편집해보세요.',
  },
  {
    id: 'detail',
    label: '디테일',
    helper: '강조 색상과 표시 옵션을 조정해요.',
  },
  {
    id: 'complete',
    label: '완성',
    helper: '완성된 카드를 확인하고 내보내세요.',
  },
];

const backgroundOptions: BackgroundOption[] = [
  {
    id: 'sunrise',
    label: '새벽 빛',
    description: '따뜻한 하루를 여는 그라데이션',
    className: 'bg-gradient-to-br from-orange-200 via-rose-200 to-purple-200',
    textClass: 'text-gray-900',
  },
  {
    id: 'linen',
    label: '리넨 텍스처',
    description: '차분한 캔버스 느낌의 배경',
    className: 'bg-[#F5F1E6]',
    textClass: 'text-gray-800',
    borderClass: 'border border-gray-300/60',
  },
  {
    id: 'night',
    label: '밤의 노트',
    description: '깊고 선명한 대비감',
    className: 'bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900',
    textClass: 'text-white',
  },
  {
    id: 'mint',
    label: '새벽 안개',
    description: '산뜻한 파스텔 톤',
    className: 'bg-gradient-to-br from-teal-200 via-sky-200 to-emerald-200',
    textClass: 'text-gray-900',
  },
];

const templateOptions: TemplateOption[] = [
  {
    id: 'centered',
    label: '중앙 정렬',
    description: '짧은 문장에 어울리는 균형 잡힌 구성',
    containerClass: 'items-center justify-center text-center gap-6',
    contentClass: 'items-center text-center',
    accentPlacement: 'bottom',
  },
  {
    id: 'journal',
    label: '저널 노트',
    description: '왼쪽 정렬과 여백을 살린 노트 느낌',
    containerClass: 'items-start justify-between text-left gap-8',
    contentClass: 'items-start text-left',
    accentPlacement: 'top',
  },
  {
    id: 'focus-line',
    label: '포커스 라인',
    description: '세로 라인으로 시선을 모으는 레이아웃',
    containerClass: 'items-start justify-between text-left gap-6 pl-4',
    contentClass: 'items-start text-left',
    accentPlacement: 'left',
  },
];

const ratioOptions: RatioOption[] = [
  {
    id: 'story',
    label: '배경커버',
    aspectRatio: '9 / 16',
    description: '스토리, 릴스에 맞는 세로 비율.',
  },
  {
    id: 'square',
    label: '1:1',
    aspectRatio: '1',
    description: '피드나 썸네일에 활용하기 좋아요.',
  },
  {
    id: 'portrait',
    label: '4:5',
    aspectRatio: '4 / 5',
    description: '인스타그램 피드 최적화 비율.',
  },
];

const accentColorOptions = [
  '#F97316',
  '#E11D48',
  '#0EA5E9',
  '#14B8A6',
  '#6366F1',
  '#334155',
];

const initialQuote = '오늘 마음에 남은 문장을 적어보세요.';
const initialAuthor = '작가 이름';

export default function CreateQuoteCardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('background');
  const [selectedBackground, setSelectedBackground] = useState(
    backgroundOptions[0].id
  );
  const [selectedTemplate, setSelectedTemplate] = useState(
    templateOptions[0].id
  );
  const [selectedRatio, setSelectedRatio] = useState<RatioOption['id']>(
    ratioOptions[0].id
  );
  const [accentColor, setAccentColor] = useState(accentColorOptions[0]);
  const [showAccent, setShowAccent] = useState(true);
  const [quoteText, setQuoteText] = useState(initialQuote);
  const [quoteAuthor, setQuoteAuthor] = useState(initialAuthor);
  const [showAuthor, setShowAuthor] = useState(true);
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'done' | 'error'>(
    'idle'
  );

  const activeBackground = useMemo(
    () =>
      backgroundOptions.find((option) => option.id === selectedBackground) ??
      backgroundOptions[0],
    [selectedBackground]
  );
  const activeTemplate = useMemo(
    () =>
      templateOptions.find((option) => option.id === selectedTemplate) ??
      templateOptions[0],
    [selectedTemplate]
  );
  const activeRatio = useMemo(
    () =>
      ratioOptions.find((option) => option.id === selectedRatio) ??
      ratioOptions[0],
    [selectedRatio]
  );
  const activeTabMeta =
    editingTabs.find((tab) => tab.id === activeTab) ?? editingTabs[0];

  useEffect(() => {
    if (copyFeedback === 'idle') {
      return;
    }
    const timer = setTimeout(() => setCopyFeedback('idle'), 1800);
    return () => clearTimeout(timer);
  }, [copyFeedback]);

  const resetState = () => {
    setSelectedBackground(backgroundOptions[0].id);
    setSelectedTemplate(templateOptions[0].id);
    setSelectedRatio(ratioOptions[0].id);
    setAccentColor(accentColorOptions[0]);
    setShowAccent(true);
    setQuoteText(initialQuote);
    setQuoteAuthor(initialAuthor);
    setShowAuthor(true);
    setActiveTab('background');
  };

  const handleUndo = () => {
    setQuoteText(initialQuote);
    setQuoteAuthor(initialAuthor);
    setShowAuthor(true);
  };

  const handleCopy = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      setCopyFeedback('error');
      return;
    }
    try {
      const authorLine = showAuthor ? `\n— ${quoteAuthor}` : '';
      await navigator.clipboard.writeText(`${quoteText}${authorLine}`);
      setCopyFeedback('done');
    } catch {
      setCopyFeedback('error');
    }
  };

  const accentEnabled = showAccent && activeTemplate.accentPlacement !== 'none';

  const renderTemplatePreview = (option: TemplateOption) => {
    const accent =
      option.accentPlacement !== 'none' ? (
        <span
          className={`${
            option.accentPlacement === 'left'
              ? 'absolute inset-y-3 left-3 w-1 rounded-full bg-gray-300'
              : option.accentPlacement === 'top'
                ? 'mx-auto mt-3 h-1 w-10 rounded-full bg-gray-300'
                : 'mx-auto mb-3 h-12 w-12 rounded-full bg-gray-200'
          }`}
          aria-hidden
        />
      ) : null;

    return (
      <div className="relative flex h-20 w-full flex-col justify-between overflow-hidden rounded-xl bg-gray-50 px-4 py-3">
        {option.accentPlacement === 'left' ? accent : null}
        {option.accentPlacement === 'top' ? accent : null}
        <div
          className={`flex flex-col gap-2 text-xs ${
            option.contentClass.includes('text-center')
              ? 'items-center text-center'
              : 'items-start text-left'
          }`}
        >
          <span className="h-2 w-16 rounded-full bg-gray-300" />
          <span className="h-2 w-12 rounded-full bg-gray-200" />
        </div>
        {option.accentPlacement === 'bottom' ? accent : null}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'background':
        return (
          <div className="grid grid-cols-2 gap-4">
            {backgroundOptions.map((option) => {
              const isActive = option.id === selectedBackground;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedBackground(option.id)}
                  className={`group flex h-full flex-col gap-3 rounded-2xl border px-3 py-4 text-left transition ${
                    isActive
                      ? 'border-gray-900 bg-gray-900/5'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  <div
                    className={`h-20 w-full rounded-xl ${option.className} ${option.borderClass ?? ''}`}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {option.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {option.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        );
      case 'template':
        return (
          <div className="flex flex-col gap-3">
            {templateOptions.map((option) => {
              const isActive = option.id === selectedTemplate;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedTemplate(option.id)}
                  className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                    isActive
                      ? 'border-gray-900 bg-gray-900/5'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  {renderTemplatePreview(option)}
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="font-semibold text-gray-900">
                      {option.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {option.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        );
      case 'text':
        return (
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-gray-900">카드 문장</span>
              <textarea
                value={quoteText}
                onChange={(event) => setQuoteText(event.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                rows={4}
                maxLength={140}
              />
              <span className="text-xs text-gray-500">
                최대 140자까지 입력할 수 있어요.
              </span>
            </label>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">작가</span>
                <label className="flex items-center gap-2 text-xs text-gray-500">
                  <input
                    type="checkbox"
                    checked={showAuthor}
                    onChange={(event) => setShowAuthor(event.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                  카드에 표시
                </label>
              </div>
              <input
                type="text"
                value={quoteAuthor}
                onChange={(event) => setQuoteAuthor(event.target.value)}
                disabled={!showAuthor}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 disabled:bg-gray-100 disabled:text-gray-400"
                placeholder="명언을 남긴 사람을 적어보세요."
              />
            </div>
          </form>
        );
      case 'detail':
        return (
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    강조 색상
                  </p>
                  <p className="text-xs text-gray-500">
                    카드에 포인트를 더할 색을 선택해요.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {accentColorOptions.map((color) => {
                    const isActive = color === accentColor;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setAccentColor(color)}
                        className={`h-7 w-7 rounded-full border transition ${
                          isActive
                            ? 'border-gray-900 ring-2 ring-gray-300'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`강조 색상 ${color}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAccent((value) => !value)}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition hover:border-gray-300"
            >
              <span>강조 요소 {showAccent ? '사용 중' : '숨김'}</span>
              <span
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  showAccent ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    showAccent ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </span>
            </button>
          </div>
        );
      case 'complete':
        return (
          <div className="flex flex-col gap-4 text-sm text-gray-700">
            <div className="rounded-2xl bg-white p-4 shadow-inner shadow-gray-200">
              <p className="text-sm font-semibold text-gray-900">카드 요약</p>
              <ul className="mt-2 space-y-1 text-xs text-gray-500">
                <li>배경 · {activeBackground.label}</li>
                <li>템플릿 · {activeTemplate.label}</li>
                <li>비율 · {activeRatio.label}</li>
                <li>
                  내용 · {quoteText.slice(0, 32)}
                  {quoteText.length > 32 ? '…' : ''}
                </li>
              </ul>
            </div>
            <p className="text-xs text-gray-500">{activeRatio.description}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                PNG로 내보내기
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('background')}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900/40"
              >
                계속 수정하기
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 bg-[#F9FAFB] px-4 pb-32 pt-10 text-gray-900">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-medium uppercase text-gray-500">
          Quote Builder
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">
          명언 카드 만들기
        </h1>
        <p className="text-sm text-gray-500">
          영감을 불러오는 문장을 조합해 나만의 카드를 완성해보세요.
        </p>
      </header>

      <nav
        className="flex items-center gap-2 rounded-full bg-white p-1 shadow-sm shadow-gray-200"
        role="tablist"
        aria-label="명언 카드 편집 단계"
      >
        {editingTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                isActive
                  ? 'bg-gray-900 text-white shadow-sm focus-visible:outline-gray-900'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-gray-300'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      <section className="flex flex-1 flex-col items-center gap-6 rounded-3xl border border-dashed border-gray-200 bg-white/70 p-6 text-gray-700">
        <div className="rounded-[32px] border border-gray-200 bg-white/80 p-4 shadow-inner shadow-gray-200">
          <div
            className={`relative flex w-full overflow-hidden rounded-2xl shadow-sm ${activeBackground.borderClass ?? ''}`}
            style={{ aspectRatio: activeRatio.aspectRatio }}
          >
            <div
              className={`relative flex h-full w-full flex-col ${activeBackground.className} ${activeBackground.textClass}`}
            >
              {accentEnabled && activeTemplate.accentPlacement === 'left' ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-6 left-6 w-1 rounded-full opacity-70"
                  style={{ backgroundColor: accentColor }}
                />
              ) : null}
              <div
                className={`relative flex h-full w-full flex-col gap-6 p-6 ${activeTemplate.containerClass}`}
              >
                {accentEnabled && activeTemplate.accentPlacement === 'top' ? (
                  <span
                    aria-hidden="true"
                    className="h-1 w-16 rounded-full opacity-80"
                    style={{ backgroundColor: accentColor }}
                  />
                ) : null}
                <div
                  className={`flex flex-col gap-3 ${activeTemplate.contentClass}`}
                >
                  <p className="text-lg font-semibold leading-relaxed">
                    {quoteText}
                  </p>
                  {showAuthor ? (
                    <p className="text-sm font-medium opacity-80">
                      — {quoteAuthor}
                    </p>
                  ) : null}
                </div>
                {accentEnabled &&
                activeTemplate.accentPlacement === 'bottom' ? (
                  <span
                    aria-hidden="true"
                    className="mt-auto h-12 w-full rounded-full opacity-80"
                    style={{
                      background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div
          id={`tab-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="w-full max-w-md space-y-4"
        >
          <p className="text-xs text-gray-500">{activeTabMeta.helper}</p>
          {renderTabContent()}
        </div>
      </section>

      <footer className="mt-auto">
        <div className="flex items-center justify-between rounded-full bg-white px-4 py-3 shadow-lg shadow-gray-200/60">
          <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
            <button
              type="button"
              onClick={resetState}
              className="rounded-full px-2 py-1 transition hover:bg-gray-100 hover:text-gray-900"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleUndo}
              className="rounded-full px-2 py-1 transition hover:bg-gray-100 hover:text-gray-900"
            >
              되돌리기
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full px-2 py-1 transition hover:bg-gray-100 hover:text-gray-900"
            >
              {copyFeedback === 'done'
                ? '복사됨'
                : copyFeedback === 'error'
                  ? '복사 실패'
                  : '복사'}
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            {ratioOptions.map((option) => {
              const isActive = option.id === selectedRatio;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedRatio(option.id)}
                  className={`rounded-full px-3 py-1 transition ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('complete')}
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            미리보기
          </button>
        </div>
      </footer>
    </main>
  );
}
