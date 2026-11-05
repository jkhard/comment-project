import type { ReactNode } from "react";
import { SentimentBadge } from "../../../shared/ui/SentimentBadge";
import type { HistoryEntry } from "../model/types";

interface HistoryEntryCardProps {
  entry: HistoryEntry;
  actions?: ReactNode;
  removing?: boolean;
}

export function HistoryEntryCard({ entry, actions, removing = false }: HistoryEntryCardProps) {
  const date = new Date(entry.createdAt).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li className={removing ? "history-card history-card--removing" : "history-card"}>
      <p className="history-card__text">{entry.text}</p>
      <div className="history-card__meta">
        <SentimentBadge label={entry.label} />
        <span>Уверенность: {Math.round(entry.confidence * 100)}%</span>
        <span>{date}</span>
        {actions}
      </div>
    </li>
  );
}