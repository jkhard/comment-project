import { Typography } from "antd";
import { Link } from "react-router-dom";
import { LoginForm } from "../../features/auth-login/ui/LoginForm";

export function LoginPage() {
  return (
    <div className="auth-card fade-in">
      <Typography.Title level={3} style={{ marginBottom: 4 }}>
        Вход
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Войдите, чтобы классифицировать комментарии и видеть историю запросов.
      </Typography.Paragraph>

      <LoginForm />

      <Typography.Text type="secondary">
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </Typography.Text>
    </div>
  );
}