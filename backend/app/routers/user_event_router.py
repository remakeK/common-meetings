from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app.services.user_event_service import UserEventService

router = APIRouter(prefix="/api/events",tags=["Event participants"],)

class AttendanceUpdate(BaseModel):
    status: str

@router.get("/{event_id}/participants")
def get_participants(event_id: int,db: Session = Depends(get_db),):
    try:
        return UserEventService(db).get_participants(event_id)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error

@router.post("/{event_id}/join", status_code=201)
def join_event(
    event_id: int,
    user_id: int = Query(...),
    db: Session = Depends(get_db),
):
    try:
        return UserEventService(db).join(user_id, event_id)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error

@router.delete("/{event_id}/leave", status_code=204)
def leave_event(event_id: int,user_id: int = Query(...),db: Session = Depends(get_db),):
    try:
        UserEventService(db).leave(user_id, event_id)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error

@router.patch("/{event_id}/participants/{user_id}/attendance")
def mark_attendance(
    event_id: int,
    user_id: int,
    data: AttendanceUpdate,
    current_user_id: int = Query(...),
    db: Session = Depends(get_db),
):
    try:
        membership = UserEventService(db).mark_attendance(
            user_id=user_id,
            event_id=event_id,
            status=data.status,
            current_user_id=current_user_id,
        )
        return {
            "user_id": membership.user_id,
            "event_id": membership.event_id,
            "attendance_status": membership.attendance_status,
        }
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except PermissionError as error:
        raise HTTPException(status_code=403, detail=str(error)) from error
