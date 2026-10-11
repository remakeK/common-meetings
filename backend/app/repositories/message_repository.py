from sqlalchemy import select
from sqlalchemy.orm import Session
from backend.app.models.entity.message import Message

class MessageRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, message_id: int) -> Message | None:
        return self.db.get(Message, message_id)

    def get_by_chat(self, chat_id: int) -> list[Message]:
        return list(
            self.db.scalars(
                select(Message)
                .where(Message.chat_id == chat_id)
                .order_by(Message.created_at)
            ).all()
        )

    def create(self, message: Message) -> Message:
        self.db.add(message)
        self.db.flush()
        return message

    def delete(self, message: Message) -> None:
        self.db.delete(message)