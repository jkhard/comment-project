import type { SentimentLabel } from "../../../shared/lib/classify";

export interface HistoryEntry {
  id: string;
  text: string;
  label: SentimentLabel;
  confidence: number;
  createdAt: string;
}

export type HistoryStatus = "idle" | "loading" | "success" | "error";