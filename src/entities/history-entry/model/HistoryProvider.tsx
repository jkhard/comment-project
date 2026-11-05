import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { fetchHistory, type MockMode } from "../api/historyApi";
import { HistoryContext, type HistoryContextValue } from "./HistoryContext";
import type { HistoryEntry, HistoryStatus } from "./types";

interface HistoryProviderProps {
  children: ReactNode;
}

export function HistoryProvider({ children }: HistoryProviderProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [status, setStatus] = useState<HistoryStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const inFlight = useRef(false);

  const load = useCallback(async (mode: MockMode = null) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("loading");
    setErrorMessage(null);

    try {
      const fetched = await fetchHistory(mode);
      setEntries((prev) => {
        const known = new Set(prev.map((entry) => entry.id));
        const merged = [...prev, ...fetched.filter((entry) => !known.has(entry.id))];
        return merged.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      });
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Неизвестная ошибка");
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }, []);

  const addEntry = useCallback((entry: HistoryEntry) => {
    setEntries((prev) => [entry, ...prev]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const value = useMemo<HistoryContextValue>(
    () => ({ entries, status, errorMessage, load, addEntry, removeEntry }),
    [entries, status, errorMessage, load, addEntry, removeEntry],
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}