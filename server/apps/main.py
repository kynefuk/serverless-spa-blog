from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .configs.db import Base, engine
from .configs.cors import origins
from .routers import routers

Base.metadata.create_all(bind=engine)

app = FastAPI()


for router in routers:
    app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["options", "get", "post", "put", "delete"],
    allow_headers=["*"],
)
