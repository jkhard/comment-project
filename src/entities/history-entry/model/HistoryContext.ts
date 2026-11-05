import { createContext } from "react";
import type { MockMode } from "../api/historyApi";
import type { HistoryEntry, HistoryStatus } from "./types";

export interface HistoryContextValue {
  entries: HistoryEntry[];
  status: HistoryStatus;
  errorMessage: string | null;
  load: (mode?: MockMode) => Promise<void>;
  addEntry: (entry: HistoryEntry) => void;
  removeEntry: (id: string) => void;
}

export const HistoryContext = createContext<HistoryContextValue | null>(null);