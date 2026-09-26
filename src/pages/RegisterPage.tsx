import { Button, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<RegisterFormValues>();

  const handleFinish = (values: RegisterFormValues) => {
    console.log("Демо-регистрация:", values);
    message.success("Аккаунт создан (демо-режим)");
    navigate("/login");
  };

  return (
    <div className="auth-card">
      <Typography.Title level={3} style={{ marginBottom: 4 }}>
        Регистрация
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Создайте аккаунт, чтобы сохранять свои запросы и результаты
        классификации.
      </Typography.Paragraph>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input placeholder="Елена Афонина" />
        </Form.Item>

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
          rules={[
            { required: true, message: "Введите пароль" },
            { min: 6, message: "Минимум 6 символов" },
          ]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 12 }}>
          <Button type="primary" htmlType="submit" block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text type="secondary">
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </Typography.Text>
    </div>
  );
}