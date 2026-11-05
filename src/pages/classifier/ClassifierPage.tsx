import { Typography } from "antd";
import { Link } from "react-router-dom";
import { ClassifyForm } from "../../features/classify-comment/ui/ClassifyForm";
import { useClassify } from "../../features/classify-comment/model/useClassify";
import { PageHeader } from "../../shared/ui/PageHeader";
import { SentimentBadge } from "../../shared/ui/SentimentBadge";
import { StateView } from "../../shared/ui/StateView";

export function ClassifierPage() {
  const { result, loading, submit, reset } = useClassify();

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Новый запрос"
        title="Классификатор комментариев"
        subtitle="Вставьте текст отзыва или комментария — сервис определит, носит он положительный или отрицательный характер, и сохранит запрос в историю."
      />

      <ClassifyForm loading={loading} onSubmit={submit} onReset={reset} />

      <section className="result-section" aria-live="polite">
        {loading && <StateView kind="loading" />}

        {!loading && result && (
          <div className="result-card fade-in">
            <Typography.Text type="secondary">Результат</Typography.Text>
            <div className="result-card__badge">
              <SentimentBadge label={result.label} />
            </div>
            <Typography.Text type="secondary">
              Уверенность (демо): {Math.round(result.confidence * 100)}%
            </Typography.Text>
            <div className="result-card__link">
              Запрос сохранён — его можно найти в <Link to="/history">истории</Link>.
            </div>
          </div>
        )}

        {!loading && !result && (
          <StateView kind="empty" description="Результат появится здесь после отправки текста" />
        )}
      </section>
    </div>
  );
}