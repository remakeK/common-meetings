from sqlalchemy.orm import Session

from app.models.chat import Chat
from app.repositories.chat_repository import ChatRepository
from app.repositories.event_repository import EventRepository

class ChatService:
    def __init__(self, db: Session):
        self.db = db
        self.chat_repository = ChatRepository(db)
        self.event_repository = EventRepository(db)

    def get_by_event(self, event_id: int) -> Chat:
        event = self.event_repository.get_by_id(event_id)
        if event is None:
            raise ValueError("Мероприятие не найдено")

        chat = self.chat_repository.get_by_event(event_id)

        if chat is None:
            raise ValueError("Чат мероприятия не найден")

        return chat

    def get_or_create(self, event_id: int) -> Chat:
        event = self.event_repository.get_by_id(event_id)
        if event is None:
            raise ValueError("Мероприятие не найдено")

        chat = self.chat_repository.get_by_event(event_id)

        if chat is not None:
            return chat

        chat = Chat(event_id=event_id)

        try:
            self.chat_repository.create(chat)
            self.db.commit()
            self.db.refresh(chat)
            return chat
        except Exception:
            self.db.rollback()
            raise
