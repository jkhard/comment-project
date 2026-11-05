import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { delay } from "../../../shared/lib/delay";
import { emailRules, loginPasswordRules } from "../../../shared/lib/validation";

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: LoginFormValues) => {
    setLoading(true);
    console.log("Демо-вход:", values.email);
    await delay(700);
    setLoading(false);
    message.success("Вход выполнен (демо-режим)");
    navigate("/");
  };

  return (
    <Form layout="vertical" onFinish={handleFinish} requiredMark={false}>
      <Form.Item label="Email" name="email" rules={emailRules} validateFirst>
        <Input placeholder="you@example.com" autoComplete="email" />
      </Form.Item>

      <Form.Item label="Пароль" name="password" rules={loginPasswordRules}>
        <Input.Password placeholder="••••••••" autoComplete="current-password" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 12 }}>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
}