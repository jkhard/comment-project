import { useEffect } from "react";
import { Button } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import type { MockMode } from "../../entities/history-entry/api/historyApi";
import { useHistory } from "../../entities/history-entry/model/useHistory";
import { HistoryEntryCard } from "../../entities/history-entry/ui/HistoryEntryCard";
import { useDeleteEntry } from "../../features/delete-history-entry/model/useDeleteEntry";
import { DeleteHistoryButton } from "../../features/delete-history-entry/ui/DeleteHistoryButton";
import { PageHeader } from "../../shared/ui/PageHeader";
import { StateView } from "../../shared/ui/StateView";

export function HistoryPage() {
  const { entries, status, errorMessage, load } = useHistory();
  const { removingId, deleteEntry } = useDeleteEntry();
  const [searchParams] = useSearchParams();

  const mockParam = searchParams.get("mock");
  const mode: MockMode = mockParam === "error" || mockParam === "empty" ? mockParam : null;

  useEffect(() => {
    if (status === "idle") {
      void load(mode);
    }
  }, [status, load, mode]);

  const handleRetry = () => {
    void load(null);
  };

  let content;
  if (status === "idle" || status === "loading") {
    content = <StateView kind="loading" />;
  } else if (status === "error") {
    content = (
      <StateView kind="error" description={errorMessage ?? undefined} onRetry={handleRetry} />
    );
  } else if (entries.length === 0) {
    content = (
      <StateView kind="empty" description="История пока пуста. Отправьте первый комментарий на классификацию.">
        <Link to="/">
          <Button type="primary">Классифицировать комментарий</Button>
        </Link>
      </StateView>
    );
  } else {
    content = (
      <ul className="history-list">
        {entries.map((entry) => (
          <HistoryEntryCard
            key={entry.id}
            entry={entry}
            removing={removingId === entry.id}
            actions={<DeleteHistoryButton onConfirm={() => void deleteEntry(entry.id)} />}
          />
        ))}
      </ul>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: 900 }}>
      <PageHeader
        eyebrow="Сохранённые запросы"
        title="История"
        subtitle="Здесь собраны все ранее отправленные комментарии вместе с результатом их классификации."
      />
      {content}
    </div>
  );
}