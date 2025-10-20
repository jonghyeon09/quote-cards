export type SavedCard = {
  id: string;
  createdAt: number;
  quoteText: string;
  quoteAuthor: string;
  showAuthor: boolean;
  backgroundId: string;
  templateId: string;
  ratioId: string;
  accentColor: string;
  showAccent: boolean;
};

export type CardPreviewData = {
  backgroundClassName: string;
  backgroundTextClass: string;
  backgroundBorderClass?: string;
  templateContainerClass: string;
  templateContentClass: string;
  templateAccentPlacement: 'top' | 'bottom' | 'left' | 'none';
  ratioAspectRatio: string;
};
