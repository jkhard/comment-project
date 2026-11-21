from sqlalchemy.orm import Session

from app.models.classification_request import ClassificationRequest
from app.schemas.classification_request import (
    ClassificationRequestCreate,
    ClassificationRequestUpdate,
)
from app.services.classification import classify_text


def get_classification_request(db: Session, request_id: int) -> ClassificationRequest | None:
    return db.get(ClassificationRequest, request_id)


def get_classification_requests(
    db: Session,
    user_id: int | None = None,
    skip: int = 0,
    limit: int = 100,
) -> list[ClassificationRequest]:
    query = db.query(ClassificationRequest)
    if user_id is not None:
        query = query.filter(ClassificationRequest.user_id == user_id)
    return (
        query.order_by(ClassificationRequest.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_classification_request(
    db: Session, user_id: int, request_in: ClassificationRequestCreate
) -> ClassificationRequest:
    label, confidence = classify_text(request_in.text)
    db_request = ClassificationRequest(
        user_id=user_id,
        text=request_in.text,
        label=label,
        confidence=confidence,
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request


def update_classification_request(
    db: Session,
    db_request: ClassificationRequest,
    request_in: ClassificationRequestUpdate,
) -> ClassificationRequest:
    update_data = request_in.model_dump(exclude_unset=True)
    if "text" in update_data:
        db_request.text = update_data["text"]
        label, confidence = classify_text(db_request.text)
        db_request.label = label
        db_request.confidence = confidence

    db.commit()
    db.refresh(db_request)
    return db_request


def delete_classification_request(db: Session, db_request: ClassificationRequest) -> None:
    db.delete(db_request)
    db.commit()