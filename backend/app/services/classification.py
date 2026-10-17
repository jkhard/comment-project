POSITIVE_WORDS = [
    "отлично", "хорошо", "нравится", "супер", "быстро", "удобно",
    "рекомендую", "спасибо", "лучший", "классно", "довольна", "доволен",
]

NEGATIVE_WORDS = [
    "плохо", "ужасно", "долго", "сломан", "поврежден", "разочарован",
    "хуже", "обман", "не работает", "верните", "отвратительно", "жаль",
]


def classify_text(text: str) -> tuple[str, float]:
    normalized = text.lower()

    positive_score = sum(1 for word in POSITIVE_WORDS if word in normalized)
    negative_score = sum(1 for word in NEGATIVE_WORDS if word in normalized)

    if positive_score == 0 and negative_score == 0:
        label = "positive" if len(normalized) % 2 == 0 else "negative"
        return label, 0.5

    total = positive_score + negative_score
    label = "positive" if positive_score >= negative_score else "negative"
    confidence = max(positive_score, negative_score) / total
    return label, confidence