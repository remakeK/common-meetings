from sqlalchemy.orm import Session

from app.models.chat import Chat
from app.repositories.chat_repository import ChatRepository
from app.repositories.event_repository import EventRepository
from app.repositories.user_event_repository import UserEventRepository


class ChatService:
    def __init__(self, db: Session):
        self.db = db
        self.chat_repository = ChatRepository(db)
        self.event_repository = EventRepository(db)
        self.user_event_repository = UserEventRepository(db)

    def _ensure_member(self, event, user_id: int) -> None:
        if event.creator_id == user_id:
            return
        if self.user_event_repository.get_membership(user_id, event.id) is not None:
            return
        raise PermissionError("Чат доступен только участникам мероприятия")

    def get_by_event(self, event_id: int, user_id: int) -> Chat:
        event = self.event_repository.get_by_id(event_id)
        if event is None:
            raise ValueError("Мероприятие не найдено")

        self._ensure_member(event, user_id)

        chat = self.chat_repository.get_by_event(event_id)
        if chat is None:
            raise ValueError("Чат мероприятия не найден")
        return chat

    def get_or_create(self, event_id: int, user_id: int) -> Chat:
        event = self.event_repository.get_by_id(event_id)
        if event is None:
            raise ValueError("Мероприятие не найдено")

        self._ensure_member(event, user_id)

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