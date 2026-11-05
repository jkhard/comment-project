import type { FormRule } from "antd";

export const emailRules: FormRule[] = [
  { required: true, message: "Введите email" },
  { type: "email", message: "Введите корректный email, например you@example.com" },
];

export const loginPasswordRules: FormRule[] = [
  { required: true, message: "Введите пароль" },
];

export const newPasswordRules: FormRule[] = [
  { required: true, message: "Придумайте пароль" },
  { min: 8, message: "Пароль должен содержать минимум 8 символов" },
  {
    pattern: /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d).+$/,
    message: "Пароль должен содержать хотя бы одну букву и одну цифру",
  },
];

export const confirmPasswordRules: FormRule[] = [
  { required: true, message: "Повторите пароль" },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Пароли не совпадают"));
    },
  }),
];

export const nameRules: FormRule[] = [
  { required: true, message: "Введите имя" },
  { whitespace: true, message: "Имя не может состоять только из пробелов" },
  { min: 2, message: "Имя должно содержать минимум 2 символа" },
  { max: 50, message: "Имя не должно быть длиннее 50 символов" },
];

export const commentRules: FormRule[] = [
  { required: true, message: "Введите текст комментария" },
  { whitespace: true, message: "Комментарий не может состоять только из пробелов" },
  { min: 10, message: "Слишком короткий текст — введите минимум 10 символов" },
  { max: 1000, message: "Максимальная длина комментария — 1000 символов" },
];