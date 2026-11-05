import type { ReactNode } from "react";
import { Button, Empty, Result, Skeleton } from "antd";

interface StateViewProps {
  kind: "loading" | "error" | "empty";
  title?: string;
  description?: string;
  onRetry?: () => void;
  children?: ReactNode;
}

export function StateView({ kind, title, description, onRetry, children }: StateViewProps) {
  if (kind === "loading") {
    return (
      <div className="state-view" aria-busy="true" aria-live="polite">
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  if (kind === "error") {
    return (
      <div className="state-view fade-in">
        <Result
          status="error"
          title={title ?? "Не удалось загрузить данные"}
          subTitle={description}
          extra={
            onRetry ? (
              <Button type="primary" onClick={onRetry}>
                Повторить
              </Button>
            ) : undefined
          }
        />
      </div>
    );
  }

  return (
    <div className="state-view fade-in">
      <Empty description={description ?? "Нет данных"} image={Empty.PRESENTED_IMAGE_SIMPLE}>
        {children}
      </Empty>
    </div>
  );
}