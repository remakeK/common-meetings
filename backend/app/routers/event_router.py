from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.event import EventCreate, EventResponse, EventUpdate
from app.services.event_service import EventService

router = APIRouter(prefix="/api/events", tags=["Events"])

@router.get("/", response_model=list[EventResponse])
def get_events(db: Session = Depends(get_db)):
    return EventService(db).get_all()

@router.get("/creator/{creator_id}", response_model=list[EventResponse])
def get_events_by_creator(creator_id: int, db: Session = Depends(get_db),):
    return EventService(db).get_by_creator(creator_id)

@router.get("/{event_id}", response_model=EventResponse)
def get_event(event_id: int,db: Session = Depends(get_db),):
    try:
        return EventService(db).get_by_id(event_id)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error

@router.post("/", response_model=EventResponse, status_code=201)
def create_event(data: EventCreate,creator_id: int = Query(...),db: Session = Depends(get_db),):
    try:
        return EventService(db).create(
            name=data.name,
            description=data.description,
            location=data.location,
            date=data.date,
            max_participants=data.max_participants,
            creator_id=creator_id,
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error

@router.put("/{event_id}", response_model=EventResponse)
def update_event(
    event_id: int,
    data: EventUpdate,
    current_user_id: int = Query(...),
    db: Session = Depends(get_db),
):
    try:
        return EventService(db).update(
            event_id=event_id,
            current_user_id=current_user_id,
            name=data.name,
            description=data.description,
            location=data.location,
            date=data.date,
            max_participants=data.max_participants
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except PermissionError as error:
        raise HTTPException(status_code=403, detail=str(error)) from error


@router.delete("/{event_id}", status_code=204)
def delete_event(event_id: int,current_user_id: int = Query(...),db: Session = Depends(get_db),):
    try:
        EventService(db).delete(event_id, current_user_id)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except PermissionError as error:
        raise HTTPException(status_code=403, detail=str(error)) from error
