from pydantic import BaseModel
from typing import Optional, List
from fastapi.encoders import jsonable_encoder

from . import models


class UserBase(BaseModel):
    name: str
    email: str


class WorkflowDto(BaseModel):
    id: Optional[int]
    name: Optional[str]
    description: Optional[str]
    is_active: Optional[bool]
    actions: Optional[str]


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True


class Login(BaseModel):
    username: str
    password: str


class SessionToken(BaseModel):
    id: int
    username: str
    grant_type: str
    token: str


def model_to_schema(workflow: models.WorkFlow):
    schema = WorkflowDto()
    schema.id = workflow.id
    schema.name = workflow.name
    schema.description = workflow.description
    schema.is_active = workflow.is_active
    schema.actions = workflow.actions
    return schema


def schema_to_model(workflow: WorkflowDto):
    model = models.WorkFlow()
    model.id = workflow.id
    model.name = workflow.name
    model.description = workflow.description
    model.is_active = workflow.is_active
    model.actions = workflow.actions
    return model
