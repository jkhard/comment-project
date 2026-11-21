from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.config import settings
from app.models.refresh_token import RefreshToken
from app.services.security import generate_refresh_token, hash_refresh_token


def create_refresh_token(db: Session, user_id: int) -> str:
    raw_token = generate_refresh_token()
    db_token = RefreshToken(
        user_id=user_id,
        token_hash=hash_refresh_token(raw_token),
        expires_at=datetime.now(timezone.utc) + timedelta(days=settings.refresh_token_expire_days),
    )
    db.add(db_token)
    db.commit()
    return raw_token


def get_refresh_token(db: Session, raw_token: str) -> RefreshToken | None:
    return (
        db.query(RefreshToken)
        .filter(RefreshToken.token_hash == hash_refresh_token(raw_token))
        .first()
    )


def revoke_refresh_token(db: Session, db_token: RefreshToken) -> None:
    if db_token.revoked_at is None:
        db_token.revoked_at = datetime.now(timezone.utc)
        db.commit()