from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.schemas.message import MessageCreate, MessageResponse
from backend.app.services.chat_service import ChatService
from backend.app.services.message_service import MessageService

router = APIRouter(prefix="/api/chats", tags=["Chats"])

@router.post("/{event_id}", status_code=201)
def get_or_create_chat(event_id: int,db: Session = Depends(get_db),):
    try:
        chat = ChatService(db).get_or_create(event_id)
        return {"event_id": chat.event_id}
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error

@router.get("/{chat_id}/messages",response_model=list[MessageResponse],)
def get_messages(chat_id: int,user_id: int = Query(...), db: Session = Depends(get_db),):
    try:
        return MessageService(db).get_messages(chat_id, user_id)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except PermissionError as error:
        raise HTTPException(status_code=403, detail=str(error)) from error

@router.post("/{chat_id}/messages",response_model=MessageResponse,status_code=201,)
def send_message(
    chat_id: int,
    data: MessageCreate,
    user_id: int = Query(...),
    db: Session = Depends(get_db),
):
    try:
        return MessageService(db).send_message(
            chat_id=chat_id,
            sender_id=user_id,
            content=data.content,
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except PermissionError as error:
        raise HTTPException(status_code=403, detail=str(error)) from error
