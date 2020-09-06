from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..models.blog import Blog
from ..schemas import schemas
from ..configs.db import get_db

router = APIRouter()


def get(session: Session, blog_id: int):
    return session.query(Blog).filter(id=blog_id).first()


def list(session: Session, skip: int = 0, limit: int = 100):
    return session.query(Blog).offset(skip).limit(limit).all()


def create(session: Session, blog: schemas.BlogCreate, user_id: int):
    blog = Blog(**blog.dict(), owner_id=user_id)
    session.add(blog)
    session.commit()
    session.refresh()
    return blog


@router.get("/blogs/", response_model=List[schemas.Blog])
def list_blogs(skip: int = 0, limit: int = 0, session: Session = Depends(get_db)):
    return list(skip=skip, limit=limit, session=session)


@router.post("/blogs/", response_model=schemas.Blog)
def create_blog(blog: schemas.BlogCreate, session: Session = Depends(get_db)):
    return create(session=session, blog=blog)
