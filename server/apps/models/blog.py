from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import LONGTEXT

from ..configs.db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(50))
    email = Column(String(255), unique=True, index=True)
    password = Column(String(30))

    blogs = relationship("Blog", back_populates="owner")


class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    title = Column(String(50))
    content = Column(LONGTEXT)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="blogs")
