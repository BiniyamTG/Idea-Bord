from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .users import router as users_router
from .ideas import router as ideas_router

app = FastAPI(title="IdeaBoard API")

# CORS setup
origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(ideas_router, prefix="/ideas", tags=["Ideas"])

# Root endpoint
@app.get("/")
async def root():
    return {"message": "IdeaBoard API is running!"}
