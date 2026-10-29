from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class UserEvent(Base):
    __tablename__ = "user_events"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), primary_key=True
    )
    event_id: Mapped[int] = mapped_column(
        ForeignKey("events.id"), primary_key=True
    )
    attendance_status: Mapped[str] = mapped_column(
        String(20), default="UNKNOWN", nullable=False
    )

    user: Mapped["User"] = relationship(
        back_populates="event_memberships"
    )
    event: Mapped["Event"] = relationship(
        back_populates="memberships"
    )