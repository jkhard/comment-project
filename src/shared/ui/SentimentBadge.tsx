import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import type { SentimentLabel } from "../lib/classify";

interface SentimentBadgeProps {
  label: SentimentLabel;
}

export function SentimentBadge({ label }: SentimentBadgeProps) {
  if (label === "positive") {
    return (
      <span className="result-badge result-badge--positive">
        <SmileOutlined /> Положительный
      </span>
    );
  }

  return (
    <span className="result-badge result-badge--negative">
      <FrownOutlined /> Отрицательный
    </span>
  );
}