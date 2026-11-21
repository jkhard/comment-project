from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.services.security import hash_password, verify_password

_DUMMY_HASH = hash_password("dummy-password-1")


def get_user(db: Session, user_id: int) -> User | None:
    return db.get(User, user_id)


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user_in: UserCreate) -> User:
    db_user = User(
        email=user_in.email,
        name=user_in.name,
        hashed_password=hash_password(user_in.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(db, email)
    if db_user is None:
        verify_password(password, _DUMMY_HASH)
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def update_user(db: Session, db_user: User, user_in: UserUpdate) -> User:
    update_data = user_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_user, field, value)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, db_user: User) -> None:
    db.delete(db_user)
    db.commit()