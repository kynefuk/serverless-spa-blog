from fastapi import FastAPI

from .configs.db import Base, engine
from .routers import routers

Base.metadata.create_all(bind=engine)

app = FastAPI()


for router in routers:
    app.include_router(router)
