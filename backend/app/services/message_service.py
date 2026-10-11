from sqlalchemy.orm import Session
from backend.app.models.entity.message import Message
from backend.app.repositories.chat_repository import ChatRepository
from backend.app.repositories.message_repository import MessageRepository
from backend.app.repositories.user_event_repository import UserEventRepository
from backend.app.repositories.user_repository import UserRepository


class MessageService:
    def __init__(self, db: Session):
        self.db = db
        self.message_repository = MessageRepository(db)
        self.chat_repository = ChatRepository(db)
        self.user_repository = UserRepository(db)
        self.user_event_repository = UserEventRepository(db)

    def get_messages(self, chat_id: int, current_user_id: int) -> list[Message]:
        chat = self.chat_repository.get_by_event(chat_id)

        if chat is None:
            raise ValueError("Чат не найден")

        self.check_access(chat_id, current_user_id)

        return self.message_repository.get_by_chat(chat_id)

    def send_message(self,chat_id: int,sender_id: int,content: str,) -> Message:
        chat = self.chat_repository.get_by_event(chat_id)

        if chat is None:
            raise ValueError("Чат не найден")

        user = self.user_repository.get_by_id(sender_id)

        if user is None:
            raise ValueError("Пользователь не найден")

        self.check_access(chat_id, sender_id)

        content = content.strip()

        if not content:
            raise ValueError("Сообщение не может быть пустым")

        message = Message(sender_id=sender_id,chat_id=chat_id,content=content)

        try:
            self.message_repository.create(message)
            self.db.commit()
            self.db.refresh(message)
            return message
        except Exception:
            self.db.rollback()
            raise

    def check_access(self, event_id: int, user_id: int) -> None:
        membership = self.user_event_repository.get_membership(
            user_id, event_id
        )

        if membership is None:
            raise PermissionError(
                "Отправлять и читать сообщения могут только участники мероприятия"
            )
