import { delay } from "../../../shared/lib/delay";
import type { HistoryEntry } from "../model/types";

const MOCK_ENTRIES: HistoryEntry[] = [
  {
    id: "h1",
    text: "Доставили быстрее, чем обещали, упаковка целая. Буду заказывать ещё!",
    label: "positive",
    confidence: 0.94,
    createdAt: "2026-09-20T10:12:00Z",
  },
  {
    id: "h2",
    text: "Товар пришёл повреждённым, а поддержка вообще не отвечает.",
    label: "negative",
    confidence: 0.89,
    createdAt: "2026-09-21T14:35:00Z",
  },
  {
    id: "h3",
    text: "В целом неплохо, но цена завышена для такого качества.",
    label: "negative",
    confidence: 0.61,
    createdAt: "2026-09-22T08:03:00Z",
  },
  {
    id: "h4",
    text: "Отличный сервис, менеджер помог подобрать нужный вариант.",
    label: "positive",
    confidence: 0.97,
    createdAt: "2026-09-22T19:47:00Z",
  },
];

export type MockMode = "error" | "empty" | null;

export async function fetchHistory(mode: MockMode = null): Promise<HistoryEntry[]> {
  await delay(900);

  if (mode === "error") {
    throw new Error("Сервер недоступен (имитация ошибки)");
  }
  if (mode === "empty") {
    return [];
  }
  return [...MOCK_ENTRIES];
}