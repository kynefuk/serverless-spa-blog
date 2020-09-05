from typing import Optional

from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

from .configs.db import DB_CONFIG

app = FastAPI()

register_tortoise(app, DB_CONFIG)


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}
