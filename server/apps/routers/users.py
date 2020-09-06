import hashlib
from typing import List

from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session

from ..models.blog import User
from ..schemas import schemas
from ..configs.db import get_db


router = APIRouter()


def get(session: Session, user_id: int):
    return session.query(User).filter(User.id == user_id).first()


def list(session: Session, skip: int = 0, limit: int = 100):
    return session.query(User).offset(skip).limit(limit).all()


def create(session: Session, user: schemas.UserCreate):
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    user = User(name=user.name, email=user.email, password=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.get("/users/", response_model=List[schemas.User])
def list_users(skip: int = 0, limit: int = 0, session: Session = Depends(get_db)):
    return list(session, skip=skip, limit=limit)


@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, session: Session = Depends(get_db)):
    db_user = get(session, id=user.id)
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    return create(session=session, user=user)
