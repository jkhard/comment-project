import { useCallback, useState } from "react";
import { delay } from "../../../shared/lib/delay";
import { useHistory } from "../../../entities/history-entry/model/useHistory";

export function useDeleteEntry() {
  const { removeEntry } = useHistory();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const deleteEntry = useCallback(
    async (id: string) => {
      setRemovingId(id);
      await delay(250);
      removeEntry(id);
      setRemovingId(null);
    },
    [removeEntry],
  );

  return { removingId, deleteEntry };
}