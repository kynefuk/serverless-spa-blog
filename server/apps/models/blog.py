from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator

from .base import BaseModel


class Blog(BaseModel):
    title = fields.CharField(max_length=50, required=True)
    content = fields.TextField(required=True)

    def __str__(self):
        return self.title


Blog_Pydantic = pydantic_model_creator(Blog, name="Blog")
