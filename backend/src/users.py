from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_SECRET = os.getenv("JWT_SECRET", "supersecretjwtkey")

# MongoDB setup
client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
db = client.idea_board
users_collection = db.users

# Pydantic models
class User(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    username: str

# Utils
def hash_password(password):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_jwt(username: str):
    return jwt.encode({"username": username}, JWT_SECRET, algorithm="HS256")

async def get_current_user(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        username = payload.get("username")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await users_collection.find_one({"username": username})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Routes
@router.post("/signup", response_model=UserOut)
async def signup(user: User):
    existing = await users_collection.find_one({"username": user.username})
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed = hash_password(user.password)
    await users_collection.insert_one({"username": user.username, "password": hashed})
    return {"username": user.username}

@router.post("/login")
async def login(user: User):
    db_user = await users_collection.find_one({"username": user.username})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_jwt(user.username)
    return {"access_token": token}
