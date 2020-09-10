from typing import List, Optional

from pydantic import BaseModel


# Pydantic models to have common attributes while creating or reading data.
class BlogBase(BaseModel):
    title: str
    content: str


class Blog(BlogBase):
    id: int
    owner_id: int

    #  Config class is used to provide configurations to Pydantic.
    class Config:
        # data.idみたいにアクセスできるよう設定
        orm_mode = True


class BlogCreate(BlogBase):
    pass


# Pydantic models to have common attributes while creating or reading data.
class UserBase(BaseModel):
    name: str
    email: str


class User(UserBase):
    id: int
    blogs: List[Blog]

    #  Config class is used to provide configurations to Pydantic.
    class Config:
        orm_mode = True


class UserCreate(UserBase):
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
