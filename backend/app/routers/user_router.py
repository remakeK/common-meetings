from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.post("/register", response_model=UserResponse, status_code=201)
def register_user(data: UserCreate, db: Session = Depends(get_db)):
    service = UserService(db)

    try:
        return service.register(name=data.name,email=str(data.email),password=data.password)

    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e),
        ) from e


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int,db: Session = Depends(get_db)):
    user = UserService(db).get_by_id(user_id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Пользователь не найден",
        )
    return user
