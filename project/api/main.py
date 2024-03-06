from typing import Union

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import api.settings.local as settings
from api.schema import HelloModel
from api.history import schema
from api.history.app import router as history_router
app = FastAPI()

app.include_router(
    history_router,
    prefix="/history",
    tags=['history'],
)





app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=settings.ALLOWED_METHODS,
    allow_headers=settings.ALLOWED_HEADERS,
)


@app.get("/", response_model=HelloModel)
async def read_root():
    return {"message": "Hello Everyone"}

