from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from .users import get_current_user, users_collection, db
from bson import ObjectId

router = APIRouter()

# Pydantic model
class Idea(BaseModel):
    title: str
    description: str

# Routes
@router.post("/")
async def create_idea(idea: Idea, current_user=Depends(get_current_user)):
    idea_doc = {
        "title": idea.title,
        "description": idea.description,
        "owner": current_user["username"]
    }
    result = await db.ideas.insert_one(idea_doc)
    return {"id": str(result.inserted_id), "message": "Idea created successfully"}

@router.get("/")
async def list_ideas(current_user=Depends(get_current_user)):
    ideas = []
    cursor = db.ideas.find({"owner": current_user["username"]})
    async for idea in cursor:
        ideas.append({"id": str(idea["_id"]), "title": idea["title"], "description": idea["description"]})
    return ideas
