from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy.orm import relationship

from ..configs.db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(50))
    email = Column(String(255), unique=True, index=True)
    password = Column(LONGTEXT)

    blogs = relationship("Blog", back_populates="owner")
