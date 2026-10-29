from sqlalchemy.orm import Session
from pwdlib import PasswordHash

from app.models.user import User
from app.repositories.user_repository import UserRepository


class UserService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repository = UserRepository(db)
        self.password_hash = PasswordHash.recommended()

    def register(self,name: str,email: str,password: str) -> User:
        if self.user_repository.get_by_email(email) is not None:
            raise ValueError("Пользователь с таким email уже существует")

        user = User(name=name,email=email,password_hash=self.password_hash.hash(password))

        try:
            self.user_repository.create(user)
            self.db.commit()
            self.db.refresh(user)
            return user
        except Exception:
            self.db.rollback()
            raise

    def get_by_id(self, user_id: int) -> User | None:
        return self.user_repository.get_by_id(user_id)

    def authenticate(self, email: str, password: str) -> User | None:
        user = self.user_repository.get_by_email(email)
        if user is None:
            return None

        if not self.password_hash.verify(password, user.password_hash):
            return None

        return user