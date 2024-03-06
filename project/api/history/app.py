from fastapi import APIRouter, Depends, status, Form
from fastapi.responses import Response, JSONResponse
from fastapi.requests import Request
from sqlalchemy.orm import Session
from typing import Annotated

from . import schema
import api.schema
from api.helpers import translate

router = APIRouter()

@router.get("", response_model=schema.Histories)
def get_all_history(resposne: Response):

    resposne.status_code = status.HTTP_200_OK
    return {
        "histories": []
    }

@router.post(
    "/create", 
    response_model=schema.HistorySchema,
    responses={
        422: {
            "model": api.schema.Message,
            "description": "Invalid english sentence"
        },
        401: {
            "model": api.schema.Message,
            "description": "Authenticated User"
        },
    }
)
def create_history(
    response: Response,
    english_token: schema.EnglishSchema | None = None,
):

    english = schema.EnglishSchema(english=english_token.english)
    print(english)
    if not english or english.english == "":
        return JSONResponse(
            status_code=422,
            content = { "message": "Invalid english sentence" }
        )


    history = schema.HistorySchema(english=english.english, hindi=translate(english.english))
    return history

