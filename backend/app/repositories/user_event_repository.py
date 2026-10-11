from sqlalchemy import func, select
from sqlalchemy.orm import Session
from backend.app.models.entity.user_event import UserEvent

class UserEventRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_membership(self,user_id: int,event_id: int) -> UserEvent | None:
        return self.db.get(UserEvent, (user_id, event_id))

    def get_by_event(self, event_id: int) -> list[UserEvent]:
        return list(
            self.db.scalars(
                select(UserEvent).where(UserEvent.event_id == event_id)
            ).all()
        )

    def count_by_event(self, event_id: int) -> int:
        return self.db.scalar(
            select(func.count())
            .select_from(UserEvent)
            .where(UserEvent.event_id == event_id)
        ) or 0

    def create(self, membership: UserEvent) -> UserEvent:
        self.db.add(membership)
        self.db.flush()
        return membership

    def delete(self, membership: UserEvent) -> None:
        self.db.delete(membership)