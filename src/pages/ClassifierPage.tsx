import { useState } from "react";
import { Button, Input, Typography, Empty } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { classifyComment } from "../utils/classify";
import type { SentimentLabel } from "../types";

const { TextArea } = Input;

interface LocalResult {
  text: string;
  label: SentimentLabel;
  confidence: number;
}

export default function ClassifierPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<LocalResult | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = text.trim().length > 0;

  const handleClassify = () => {
    if (!canSubmit) return;
    setLoading(true);
    setResult(null);

    window.setTimeout(() => {
      const { label, confidence } = classifyComment(text);
      setResult({ text, label, confidence });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="page-container">
      <p className="page-eyebrow">Новый запрос</p>
      <h1 className="page-title">Классификатор комментариев</h1>
      <p className="page-subtitle">
        Вставьте текст отзыва или комментария — сервис определит, носит он
        положительный или отрицательный характер, и сохранит запрос в
        историю.
      </p>

      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Например: «Заказ пришёл вовремя, упаковка аккуратная, спасибо!»"
        autoSize={{ minRows: 5, maxRows: 10 }}
        maxLength={1000}
        showCount
      />

      <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          size="large"
          loading={loading}
          disabled={!canSubmit}
          onClick={handleClassify}
        >
          Классифицировать
        </Button>
      </div>

      <div style={{ marginTop: 40 }}>
        {result ? (
          <div>
            <Typography.Text type="secondary">Результат</Typography.Text>
            <div style={{ marginTop: 8, marginBottom: 12 }}>
              {result.label === "positive" ? (
                <span className="result-badge result-badge--positive">
                  <SmileOutlined /> Положительный
                </span>
              ) : (
                <span className="result-badge result-badge--negative">
                  <FrownOutlined /> Отрицательный
                </span>
              )}
            </div>
            <Typography.Text type="secondary">
              Уверенность (демо): {Math.round(result.confidence * 100)}%
            </Typography.Text>
          </div>
        ) : (
          <Empty
            description="Результат появится здесь после отправки текста"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>
    </div>
  );
}