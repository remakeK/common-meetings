from sqlalchemy.orm import Session

from backend.app.models.entity.user_event import UserEvent
from backend.app.repositories.event_repository import EventRepository
from backend.app.repositories.user_event_repository import UserEventRepository
from backend.app.repositories.user_repository import UserRepository

class UserEventService:
    def __init__(self, db: Session):
        self.db = db
        self.event_repository = EventRepository(db)
        self.user_repository = UserRepository(db)
        self.user_event_repository = UserEventRepository(db)

    def get_participants(self, event_id: int) -> list[UserEvent]:
        event = self.event_repository.get_by_id(event_id)
        if event is None:
            raise ValueError("Мероприятие не найдено")

        return self.user_event_repository.get_by_event(event_id)

    def join(self, user_id: int, event_id: int) -> UserEvent:
        user = self.user_repository.get_by_id(user_id)
        event = self.event_repository.get_by_id(event_id)
        if user is None:
            raise ValueError("Пользователь не найден")

        if event is None:
            raise ValueError("Мероприятие не найдено")

        existing = self.user_event_repository.get_membership(
            user_id, event_id)

        if existing is not None:
            raise ValueError("Пользователь уже записан на мероприятие")
        participant_count = self.user_event_repository.count_by_event(event_id)

        if participant_count >= event.max_participants:
            raise ValueError("На мероприятии больше нет свободных мест")

        membership = UserEvent(user_id=user_id,event_id=event_id,attendance_status="UNKNOWN",)

        try:
            self.user_event_repository.create(membership)
            self.db.commit()
            return membership
        except Exception:
            self.db.rollback()
            raise

    def leave(self, user_id: int, event_id: int) -> None:
        membership = self.user_event_repository.get_membership(user_id, event_id)

        if membership is None:
            raise ValueError("Пользователь не записан на мероприятие")

        event = self.event_repository.get_by_id(event_id)

        if event is not None and event.creator_id == user_id:
            raise ValueError("Создатель не может выйти из своего мероприятия")

        try:
            self.user_event_repository.delete(membership)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise

    def mark_attendance(self,user_id: int,event_id: int,status: str,current_user_id: int,) -> UserEvent:
        event = self.event_repository.get_by_id(event_id)
        if event is None:
            raise ValueError("Мероприятие не найдено")

        if event.creator_id != current_user_id:
            raise PermissionError(
                "Отмечать посещение может только создатель мероприятия"
            )

        if status not in ("PRESENT", "ABSENT"):
            raise ValueError("Статус должен быть PRESENT или ABSENT")

        membership = self.membership_repository.get_membership(
            user_id, event_id
        )

        if membership is None:
            raise ValueError("Участник не записан на мероприятие")

        try:
            membership.attendance_status = status
            self.db.commit()
            self.db.refresh(membership)
            return membership
        except Exception:
            self.db.rollback()
            raise
