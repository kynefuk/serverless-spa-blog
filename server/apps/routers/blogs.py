from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..configs.db import get_db
from ..models.blog import Blog
from ..schemas import schemas
from .users import User, get_current_user

router = APIRouter()


def get(session: Session, blog_id: int):
    return session.query(Blog).filter(id=blog_id).first()


def list(session: Session, skip: int = 0, limit: int = 100):
    return session.query(Blog).offset(skip).limit(limit).all()


def create(session: Session, blog: schemas.BlogCreate, user_id: int):
    blog = Blog(**blog.dict(), owner_id=user_id)
    session.add(blog)
    session.commit()
    session.refresh(blog)
    return blog


def delete(session: Session, blog_id: int):
    return session.query(Blog).filter(id=blog_id).delete()


@router.get("/blogs/", response_model=List[schemas.Blog])
def list_blogs(skip: int = 0, limit: int = 0, session: Session = Depends(get_db)):
    return list(skip=skip, limit=limit, session=session)


@router.post("/blogs/", response_model=schemas.Blog)
def create_blog(
    blog: schemas.BlogCreate,
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create(session=session, blog=blog, user_id=current_user.id)


@router.get("/blogs/{blog_id}/", response_model=schemas.Blog)
def get_blog(blog_id: int, session: Session = Depends(get_db)):
    return get(session=session, blog_id=blog_id)


@router.delete("/blogs/{blog_id}/")
def delete_blog(
    blog_id: int,
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return delete(session=session, blog_id=blog_id)
