from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class EventCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    description: str
    location: str = Field(min_length=1, max_length=255)
    date: datetime
    max_participants: int = Field(gt=0)

class EventUpdate(EventCreate):
    pass

class EventResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    description: str
    location: str
    date: datetime
    max_participants: int
    creator_id: int
