import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_URL = os.environ.get(
    "MYSQL_DATABASE_URL", "mysql+pymysql://root:root@db/blog"
)
DB_USER = os.environ.get("DB_USER", "root")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "password")
DB_NAME = os.environ.get("DB_NAME", "blog")

MYSQL_DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_URL}/{DB_NAME}"

engine = create_engine(MYSQL_DATABASE_URL)

# Create DB Session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
