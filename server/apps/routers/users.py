import hashlib
import os
from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from ..configs.db import get_db
from ..models.users import User
from ..schemas import schemas

router = APIRouter()

# openssl rand -hex 32
SECRET_KEY = os.environ.get(
    "SECRET_KEY", "18cd8d674472ad2af474a3e4d5dd9aa97eaf6cc246e8242aeb24e358ba320f34"
)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
print(SECRET_KEY)

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user_by_email(session: Session, user_email: str):
    return session.query(User).filter(User.email == user_email).first()


def get_users(session: Session, skip: int = 0, limit: int = 100):
    return session.query(User).offset(skip).limit(limit).all()


def create(session: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    user = User(name=user.name, email=user.email, password=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def get_user(session: Session, username: str):
    return session.query(User).filter(User.name == username).first()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(session, username: str, password: str):
    user = get_user(session, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def get_password_hash(plain_password):
    return pwd_context.hash(plain_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(access_token: str):
    plain_data = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHM)
    print(plain_data)


@router.post("/token/verify")
def verify_access_token(access_token: schemas.VerifyToken):
    verify_token(access_token)


async def get_current_user(
    session: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(session=session, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    session: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.name}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# Authorization Header Bearer
@router.get("/users/me/", response_model=schemas.User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/users/", response_model=List[schemas.User])
def list_users(skip: int = 0, limit: int = 100, session: Session = Depends(get_db)):
    return get_users(session, skip=skip, limit=limit)


@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, session: Session = Depends(get_db)):
    db_user = get_user_by_email(session, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    return create(session=session, user=user)
