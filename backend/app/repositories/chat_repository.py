from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.chat import Chat


class ChatRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_event(self, event_id: int) -> Chat | None:
        return self.db.scalar(select(Chat).where(Chat.event_id == event_id))

    def create(self, chat: Chat) -> Chat:
        self.db.add(chat)
        self.db.flush()
        return chat

    def delete(self, chat: Chat) -> None:
        self.db.delete(chat)

    def get_by_id(self, chat_id: int) -> Chat | None:
        return self.db.scalar(select(Chat).where(Chat.id == chat_id))