from fastapi import FastAPI
from app.routers import(user_router, event_router, user_event_router, chat_router)

app = FastAPI()
app.include_router(user_router.router)
app.include_router(event_router.router)
app.include_router(chat_router.router)
app.include_router(user_event_router.router)

@app.get("/")
def root():
    return {"message": "api"}