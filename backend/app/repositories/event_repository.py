from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.event import Event

class EventRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, event_id: int) -> Event | None:
        return self.db.scalar(
            select(Event).where(Event.id == event_id)
        )

    def get_all(self) -> list[Event]:
        return list(self.db.scalars(select(Event)).all())

    def get_by_creator(self, creator_id: int) -> list[Event]:
        return list(
            self.db.scalars(
                select(Event).where(Event.creator_id == creator_id)
            ).all()
        )

    def create(self, event: Event) -> Event:
        self.db.add(event)
        self.db.flush()
        return event

    def delete(self, event: Event) -> None:
        self.db.delete(event)