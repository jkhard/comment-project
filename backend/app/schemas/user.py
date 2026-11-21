import re
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class UserBase(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=128)
    @field_validator("password")
    @classmethod
    def password_must_have_letter_and_digit(cls, value: str) -> str:
        if not re.search(r"[A-Za-zА-Яа-яЁё]", value) or not re.search(r"\d", value):
            raise ValueError("Пароль должен содержать хотя бы одну букву и одну цифру")
        return value


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    name: str | None = Field(default=None, min_length=1, max_length=100)


class UserRead(UserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)