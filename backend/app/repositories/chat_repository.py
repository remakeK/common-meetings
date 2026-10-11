from sqlalchemy.orm import Session
from backend.app.models.entity.chat import Chat


class ChatRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_event(self, event_id: int) -> Chat | None:
        return self.db.get(Chat, event_id)

    def create(self, chat: Chat) -> Chat:
        self.db.add(chat)
        self.db.flush()
        return chat

    def delete(self, chat: Chat) -> None:
        self.db.delete(chat)