import { SavedCard } from '@/types/savedCard';

const STORAGE_KEY = 'quote-cards-saved';

export const cardStorage = {
  // 모든 저장된 카드 가져오기
  getAll(): SavedCard[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('카드 목록을 불러오는데 실패했습니다:', error);
      return [];
    }
  },

  // 카드 저장
  save(card: Omit<SavedCard, 'id' | 'createdAt'>): SavedCard {
    const newCard: SavedCard = {
      ...card,
      id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
    };

    const cards = this.getAll();
    cards.unshift(newCard); // 최신 카드를 맨 앞에 추가
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));

    return newCard;
  },

  // 카드 삭제
  delete(cardId: string): boolean {
    try {
      const cards = this.getAll();
      const filtered = cards.filter((card) => card.id !== cardId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('카드 삭제에 실패했습니다:', error);
      return false;
    }
  },

  // 특정 카드 가져오기
  getById(cardId: string): SavedCard | null {
    const cards = this.getAll();
    return cards.find((card) => card.id === cardId) ?? null;
  },

  // 모든 카드 삭제
  deleteAll(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('모든 카드 삭제에 실패했습니다:', error);
      return false;
    }
  },
};
