import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { themeConfig } from "./styles/theme";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClassifierPage from "./pages/ClassifierPage";
import HistoryPage from "./pages/HistoryPage";


export default function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<AppLayout />}>
            <Route path="/" element={<ClassifierPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}