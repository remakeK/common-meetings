from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.app.database import Base


class Chat(Base):
    __tablename__ = "chats"

    event_id: Mapped[int] = mapped_column(
        ForeignKey("events.id"), primary_key=True
    )

    event: Mapped["Event"] = relationship(
        back_populates="chat"
    )
    messages: Mapped[list["Message"]] = relationship(
        back_populates="chat"
    )