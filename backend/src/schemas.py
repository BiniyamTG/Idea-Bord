from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
from .models import PyObjectId

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: str

class IdeaBase(BaseModel):
    title: str
    description: str
    tags: List[str] = []

class IdeaCreate(IdeaBase):
    pass

class IdeaOut(IdeaBase):
    id: str
    author: str
    votes: int
    created_at: datetime
    comments: List[dict] = []
