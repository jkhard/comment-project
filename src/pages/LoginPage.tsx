import { Button, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginFormValues>();

  const handleFinish = (values: LoginFormValues) => {
    console.log("Демо-вход:", values);
    message.success("Вход выполнен (демо-режим)");
    navigate("/");
  };

  return (
    <div className="auth-card">
      <Typography.Title level={3} style={{ marginBottom: 4 }}>
        Вход
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Войдите, чтобы классифицировать комментарии и видеть историю
        запросов.
      </Typography.Paragraph>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Введите email" },
            { type: "email", message: "Некорректный email" },
          ]}
        >
          <Input placeholder="you@example.com" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 12 }}>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text type="secondary">
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </Typography.Text>
    </div>
  );
}