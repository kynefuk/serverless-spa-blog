from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import as_declarative, declared_attr

from sqlalchemy.orm import sessionmaker


MYSQL_DATABASE_URL = "mysql://root:root@db/blog"

engine = create_engine(MYSQL_DATABASE_URL)

# Create DB Session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@as_declarative()
class Base:
    id: int
    __name__: str
    # Generate __tablename__ automatically

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()


# Create ORM DB Base Model
# Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
