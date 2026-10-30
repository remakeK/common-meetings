from sqlalchemy.orm import Session
from pwdlib import PasswordHash

from app.models.user import User
from app.repositories.refresh_token_repository import RefreshTokenRepository
from app.repositories.user_repository import UserRepository
from datetime import datetime, timedelta, timezone
from jose import JWTError
from app.core.config import settings
from app.core.security import create_access_token, create_refresh_token, decode_token
from app.models.refresh_token import RefreshToken
from app.repositories.refresh_token_repository import RefreshTokenRepository


class UserService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repository = UserRepository(db)
        self.refresh_repo = RefreshTokenRepository(db)
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

    def issue_tokens(self, user: User) -> tuple[str, str]:
        access = create_access_token(str(user.id))
        refresh = create_refresh_token(str(user.id))

        payload = decode_token(refresh)
        self.refresh_repo.create(RefreshToken(
            jti=payload["jti"],
            user_id=user.id,
            expires_at=datetime.fromtimestamp(payload["exp"], tz=timezone.utc),
        ))

        self.db.commit()
        return access, refresh

    def refresh_tokens(self, refresh_token: str) -> tuple[str, str]:
        try:
            payload = decode_token(refresh_token)
        except JWTError as e:
            raise ValueError("Невалидный refresh token") from e

        if payload.get("type") != "refresh":
            raise ValueError("Неверный тип токена")

        stored = self.refresh_repo.get_by_jti(payload["jti"])
        if stored is None or stored.revoked:
            raise ValueError("Refresh token отозван или не существует")

        if stored.expires_at <= datetime.now(timezone.utc):
            raise ValueError("Refresh token истёк")

        user = self.user_repository.get_by_id(int(payload["sub"]))
        if user is None:
            raise ValueError("Пользователь не найден")

        self.refresh_repo.revoke(stored)
        return self.issue_tokens(user)

    def logout(self, refresh_token: str) -> None:
        try:
            payload = decode_token(refresh_token)
        except JWTError:
            return
        stored = self.refresh_repo.get_by_jti(payload.get("jti", ""))
        if stored and not stored.revoked:
            self.refresh_repo.revoke(stored)
            self.db.commit()