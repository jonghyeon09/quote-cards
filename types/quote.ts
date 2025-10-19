export type QuoteCategory =
  | '지혜'
  | '동기'
  | '사랑'
  | '관계'
  | '성공'
  | '힐링'
  | '집중';

export type Quote = {
  id: string | number;
  text: string;
  author: string;
  era?: string;
  tags?: string[];
  categories: QuoteCategory[];
};
