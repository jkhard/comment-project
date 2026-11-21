from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

SentimentLabel = Literal["positive", "negative"]


class ClassificationRequestCreate(BaseModel):
    text: str = Field(min_length=1, max_length=1000)


class ClassificationRequestUpdate(BaseModel):
    text: str | None = Field(default=None, min_length=1, max_length=1000)


class ClassificationRequestRead(BaseModel):
    id: int
    user_id: int
    text: str
    label: SentimentLabel
    confidence: float
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)