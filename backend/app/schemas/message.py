from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class MessageCreate(BaseModel):
    content: str = Field(min_length=1, max_length=4096)


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    sender_id: int
    chat_id: int
    content: str
    created_at: datetime
