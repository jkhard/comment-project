import { useCallback, useState } from "react";
import { classifyComment, type ClassificationResult } from "../../../shared/lib/classify";
import { delay } from "../../../shared/lib/delay";
import { useHistory } from "../../../entities/history-entry/model/useHistory";

export function useClassify() {
  const { addEntry } = useHistory();
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = useCallback(
    async (text: string) => {
      setLoading(true);
      setResult(null);
      try {
        await delay(600);
        const classification = classifyComment(text);
        setResult(classification);
        addEntry({
          id: crypto.randomUUID(),
          text,
          label: classification.label,
          confidence: classification.confidence,
          createdAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    },
    [addEntry],
  );

  const reset = useCallback(() => setResult(null), []);

  return { result, loading, submit, reset };
}