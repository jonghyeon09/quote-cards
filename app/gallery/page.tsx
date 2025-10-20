'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cardStorage } from '@/utils/cardStorage';
import { SavedCard } from '@/types/savedCard';

type BackgroundOption = {
  id: string;
  className: string;
  textClass: string;
  borderClass?: string;
};

type TemplateOption = {
  id: string;
  containerClass: string;
  contentClass: string;
  accentPlacement: 'top' | 'bottom' | 'left' | 'none';
};

type RatioOption = {
  id: string;
  aspectRatio: string;
};

const backgroundOptions: BackgroundOption[] = [
  {
    id: 'sunrise',
    className: 'bg-gradient-to-br from-orange-200 via-rose-200 to-purple-200',
    textClass: 'text-gray-900',
  },
  {
    id: 'linen',
    className: 'bg-[#F5F1E6]',
    textClass: 'text-gray-800',
    borderClass: 'border border-gray-300/60',
  },
  {
    id: 'night',
    className: 'bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900',
    textClass: 'text-white',
  },
  {
    id: 'mint',
    className: 'bg-gradient-to-br from-teal-200 via-sky-200 to-emerald-200',
    textClass: 'text-gray-900',
  },
];

const templateOptions: TemplateOption[] = [
  {
    id: 'centered',
    containerClass: 'items-center justify-center text-center gap-6',
    contentClass: 'items-center text-center',
    accentPlacement: 'bottom',
  },
  {
    id: 'journal',
    containerClass: 'items-start justify-between text-left gap-8',
    contentClass: 'items-start text-left',
    accentPlacement: 'top',
  },
  {
    id: 'focus-line',
    containerClass: 'items-start justify-between text-left gap-6 pl-4',
    contentClass: 'items-start text-left',
    accentPlacement: 'left',
  },
];

const ratioOptions: RatioOption[] = [
  {
    id: 'story',
    aspectRatio: '9 / 16',
  },
  {
    id: 'square',
    aspectRatio: '1',
  },
  {
    id: 'portrait',
    aspectRatio: '4 / 5',
  },
];

export default function GalleryPage() {
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<SavedCard | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = () => {
    const savedCards = cardStorage.getAll();
    setCards(savedCards);
  };

  const handleDelete = (cardId: string) => {
    if (cardStorage.delete(cardId)) {
      loadCards();
      if (selectedCard?.id === cardId) {
        setSelectedCard(null);
      }
      setDeleteConfirm(null);
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('정말로 모든 카드를 삭제하시겠습니까?')) {
      if (cardStorage.deleteAll()) {
        loadCards();
        setSelectedCard(null);
      }
    }
  };

  const getBackground = (id: string) =>
    backgroundOptions.find((opt) => opt.id === id) ?? backgroundOptions[0];

  const getTemplate = (id: string) =>
    templateOptions.find((opt) => opt.id === id) ?? templateOptions[0];

  const getRatio = (id: string) =>
    ratioOptions.find((opt) => opt.id === id) ?? ratioOptions[0];

  const formatDate = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;

    const date = new Date(timestamp);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const renderCard = (card: SavedCard, isPreview = false) => {
    const background = getBackground(card.backgroundId);
    const template = getTemplate(card.templateId);
    const ratio = getRatio(card.ratioId);
    const accentEnabled =
      card.showAccent && template.accentPlacement !== 'none';

    return (
      <div
        className={`relative flex w-full overflow-hidden ${isPreview ? 'rounded-3xl' : 'rounded-xl'} shadow-md ${background.borderClass ?? ''}`}
        style={{ aspectRatio: ratio.aspectRatio }}
      >
        <div
          className={`relative flex h-full w-full flex-col ${background.className} ${background.textClass}`}
        >
          {accentEnabled && template.accentPlacement === 'left' ? (
            <span
              aria-hidden="true"
              className="absolute inset-y-6 left-6 w-1 rounded-full opacity-70"
              style={{ backgroundColor: card.accentColor }}
            />
          ) : null}
          <div
            className={`relative flex h-full w-full flex-col gap-4 p-6 ${template.containerClass}`}
          >
            {accentEnabled && template.accentPlacement === 'top' ? (
              <span
                aria-hidden="true"
                className="h-1 w-16 rounded-full opacity-80"
                style={{ backgroundColor: card.accentColor }}
              />
            ) : null}
            <div className={`flex flex-col gap-2 ${template.contentClass}`}>
              <p
                className={`font-semibold leading-relaxed ${isPreview ? 'text-xl' : 'text-sm'}`}
              >
                {card.quoteText}
              </p>
              {card.showAuthor ? (
                <p
                  className={`font-medium opacity-80 ${isPreview ? 'text-base' : 'text-xs'}`}
                >
                  — {card.quoteAuthor}
                </p>
              ) : null}
            </div>
            {accentEnabled && template.accentPlacement === 'bottom' ? (
              <span
                aria-hidden="true"
                className={`mt-auto rounded-full opacity-80 ${isPreview ? 'h-14 w-full' : 'h-8 w-full'}`}
                style={{
                  background: `linear-gradient(90deg, ${card.accentColor}, transparent)`,
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 bg-[#F9FAFB] px-4 pb-24 pt-10 text-gray-900">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-gray-300 hover:bg-white"
              aria-label="홈으로"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <div>
              <p className="text-xs font-medium uppercase text-gray-500">
                My Gallery
              </p>
              <h1 className="text-3xl font-semibold text-gray-900">
                카드 보관함
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                저장된 명언 카드 {cards.length}개
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/create"
              className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              새 카드 만들기
            </Link>
            {cards.length > 0 && (
              <button
                type="button"
                onClick={handleDeleteAll}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-400 hover:bg-gray-100"
              >
                전체 삭제
              </button>
            )}
          </div>
        </div>
      </header>

      {cards.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white/50 py-24">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-gray-100 p-4">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                저장된 카드가 없습니다
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                첫 번째 명언 카드를 만들어보세요
              </p>
            </div>
            <Link
              href="/create"
              className="mt-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              카드 만들기
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => setSelectedCard(card)}
                className="w-full"
              >
                {renderCard(card)}
              </button>
              <div className="flex items-center justify-between px-1 text-xs text-gray-500">
                <span>{formatDate(card.createdAt)}</span>
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(card.id)}
                  className="rounded-full p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  aria-label="카드 삭제"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              {deleteConfirm === card.id && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60 p-4 backdrop-blur-sm">
                  <div className="flex flex-col gap-3 rounded-xl bg-white p-4 text-center shadow-lg">
                    <p className="text-sm font-semibold text-gray-900">
                      삭제하시겠습니까?
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm(null)}
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(card.id)}
                        className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-md overflow-auto rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
              aria-label="닫기"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  카드 상세
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDate(selectedCard.createdAt)}
                </p>
              </div>

              {renderCard(selectedCard, true)}

              <div className="mt-2 flex flex-col gap-2 rounded-xl bg-gray-50 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">배경</span>
                  <span className="font-medium text-gray-900">
                    {selectedCard.backgroundId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">템플릿</span>
                  <span className="font-medium text-gray-900">
                    {selectedCard.templateId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">비율</span>
                  <span className="font-medium text-gray-900">
                    {selectedCard.ratioId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">강조 색상</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-5 w-5 rounded-full border border-gray-300"
                      style={{ backgroundColor: selectedCard.accentColor }}
                    />
                    <span className="font-medium text-gray-900">
                      {selectedCard.accentColor}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('이 카드를 삭제하시겠습니까?')) {
                      handleDelete(selectedCard.id);
                    }
                  }}
                  className="flex-1 rounded-full border border-red-300 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  삭제하기
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="flex-1 rounded-full bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
