import { ConfigProvider } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HistoryProvider } from "../entities/history-entry/model/HistoryProvider";
import { ClassifierPage } from "../pages/classifier/ClassifierPage";
import { HistoryPage } from "../pages/history/HistoryPage";
import { LoginPage } from "../pages/login/LoginPage";
import { RegisterPage } from "../pages/register/RegisterPage";
import { AppLayout } from "./layout/AppLayout";
import { themeConfig } from "./styles/theme";

export function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <HistoryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<AppLayout />}>
              <Route path="/" element={<ClassifierPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Route>

            {/* Любой неизвестный адрес ведёт на главный экран. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </HistoryProvider>
    </ConfigProvider>
  );
}