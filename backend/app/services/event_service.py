from datetime import datetime
from sqlalchemy.orm import Session

from backend.app.models.entity.event import Event
from backend.app.repositories.event_repository import EventRepository

class EventService:
    def __init__(self, db: Session):
        self.db = db
        self.event_repository = EventRepository(db)

    def get_all(self) -> list[Event]:
        return self.event_repository.get_all()

    def get_by_id(self, event_id: int) -> Event:
        event = self.event_repository.get_by_id(event_id)
        if event is None:
            raise ValueError("Мероприятие не найдено")
        return event

    def get_by_creator(self, creator_id: int) -> list[Event]:
        return self.event_repository.get_by_creator(creator_id)

    def create(self,name: str,description: str,location: str,
               date: datetime,max_participants: int,creator_id: int,) -> Event:
        if max_participants < 1:
            raise ValueError("Количество участников должно быть больше нуля")

        event = Event(name=name,description=description,location=location,
                      date=date,max_participants=max_participants,creator_id=creator_id,)

        try:
            self.event_repository.create(event)
            self.db.commit()
            self.db.refresh(event)
            return event
        except Exception:
            self.db.rollback()
            raise

    def update(self,event_id: int,current_user_id: int,name: str,description: str,
        location: str,date: datetime,max_participants: int,) -> Event:
        event = self.get_by_id(event_id)

        if event.creator_id != current_user_id:
            raise PermissionError("Изменять мероприятие может только создатель")

        if max_participants < 1:
            raise ValueError("Количество участников должно быть больше нуля")

        if max_participants < len(event.memberships):
            raise ValueError("Новый лимит меньше текущего количества участников")

        try:
            event.name = name
            event.description = description
            event.location = location
            event.date = date
            event.max_participants = max_participants

            self.db.commit()
            self.db.refresh(event)
            return event
        except Exception:
            self.db.rollback()
            raise

    def delete(self, event_id: int, current_user_id: int) -> None:
        event = self.get_by_id(event_id)

        if event.creator_id != current_user_id:
            raise PermissionError("Удалять мероприятие может только создатель")

        try:
            self.event_repository.delete(event)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise
