import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { delay } from "../../../shared/lib/delay";
import {
  confirmPasswordRules,
  emailRules,
  nameRules,
  newPasswordRules,
} from "../../../shared/lib/validation";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    console.log("Демо-регистрация:", values.email);
    await delay(700);
    setLoading(false);
    message.success("Аккаунт создан (демо-режим)");
    navigate("/login");
  };

  return (
    <Form layout="vertical" onFinish={handleFinish} requiredMark={false}>
      <Form.Item label="Имя" name="name" rules={nameRules} validateFirst>
        <Input placeholder="Елена" autoComplete="name" />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={emailRules} validateFirst>
        <Input placeholder="you@example.com" autoComplete="email" />
      </Form.Item>

      <Form.Item label="Пароль" name="password" rules={newPasswordRules} validateFirst>
        <Input.Password placeholder="Минимум 8 символов, буквы и цифры" autoComplete="new-password" />
      </Form.Item>

      <Form.Item
        label="Повторите пароль"
        name="confirm"
        dependencies={["password"]}
        rules={confirmPasswordRules}
        validateFirst
      >
        <Input.Password placeholder="Ещё раз тот же пароль" autoComplete="new-password" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 12 }}>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
}