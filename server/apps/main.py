from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from .configs.cors import origins
from .configs.db import Base, engine
from .configs.settings import settings
from .routers import routers

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)


for router in routers:
    app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["OPTIONS", "GET", "POST", "PATCH", "DELETE"],
    allow_headers=["*"],
)

# FastAPIのインスタンスをMangumのコンストラクタに渡して、handlerとして外から読めるようにしておく
handler = Mangum(app)
