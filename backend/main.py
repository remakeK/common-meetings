from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import(user_router, event_router, user_event_router, chat_router, auth_router)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router.router)
app.include_router(event_router.router)
app.include_router(chat_router.router)
app.include_router(user_event_router.router)
app.include_router(auth_router.router)

@app.get("/")
def root():
    return {"message": "api"}
