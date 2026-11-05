export type SentimentLabel = "positive" | "negative";

export interface ClassificationResult {
  label: SentimentLabel;
  confidence: number; // от 0 до 1
}

const POSITIVE_WORDS = [
  "отлично",
  "хорошо",
  "нравится",
  "супер",
  "быстро",
  "удобно",
  "рекомендую",
  "спасибо",
  "лучший",
  "классно",
  "довольна",
  "доволен",
];

const NEGATIVE_WORDS = [
  "плохо",
  "ужасно",
  "долго",
  "сломан",
  "поврежден",
  "разочарован",
  "хуже",
  "обман",
  "не работает",
  "верните",
  "отвратительно",
  "жаль",
];

export function classifyComment(text: string): ClassificationResult {
  const normalized = text.toLowerCase();

  let positiveScore = 0;
  let negativeScore = 0;

  for (const word of POSITIVE_WORDS) {
    if (normalized.includes(word)) positiveScore += 1;
  }
  for (const word of NEGATIVE_WORDS) {
    if (normalized.includes(word)) negativeScore += 1;
  }

  if (positiveScore === 0 && negativeScore === 0) {
    const fallbackPositive = normalized.length % 2 === 0;
    return {
      label: fallbackPositive ? "positive" : "negative",
      confidence: 0.5,
    };
  }

  const total = positiveScore + negativeScore;
  const label: SentimentLabel = positiveScore >= negativeScore ? "positive" : "negative";
  const confidence = Math.max(positiveScore, negativeScore) / total;

  return { label, confidence };
}