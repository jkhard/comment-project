export type SentimentLabel = "positive" | "negative";

export interface HistoryEntry {
  id: string;
  text: string;
  label: SentimentLabel;
  confidence: number;
  createdAt: string;
}