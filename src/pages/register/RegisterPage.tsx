import { Typography } from "antd";
import { Link } from "react-router-dom";
import { RegisterForm } from "../../features/auth-register/ui/RegisterForm";

export function RegisterPage() {
  return (
    <div className="auth-card fade-in">
      <Typography.Title level={3} style={{ marginBottom: 4 }}>
        Регистрация
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Создайте аккаунт, чтобы сохранять свои запросы и результаты классификации.
      </Typography.Paragraph>

      <RegisterForm />

      <Typography.Text type="secondary">
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </Typography.Text>
    </div>
  );
}