import { useContext } from "react";
import { HistoryContext } from "./HistoryContext";

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === null) {
    throw new Error("useHistory нужно вызывать внутри <HistoryProvider>");
  }
  return context;
}