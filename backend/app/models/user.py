from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    created_events: Mapped[list["Event"]] = relationship(
        back_populates="creator"
    )
    event_memberships: Mapped[list["UserEvent"]] = relationship(
        back_populates="user"
    )
    messages: Mapped[list["Message"]] = relationship(
        back_populates="sender"
    )