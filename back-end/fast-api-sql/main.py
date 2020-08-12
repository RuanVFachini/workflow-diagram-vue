from typing import List

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


origins = [
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/api/users/", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/api/users/", response_model=List[schemas.User], status_code=status.HTTP_200_OK)
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/api/users/{user_id}", response_model=schemas.User, status_code=status.HTTP_200_OK)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return db_user


@app.post("/api/login", response_model=schemas.SessionToken, status_code=status.HTTP_200_OK)
def login(user: schemas.Login, db: Session = Depends(get_db)):
    token = crud.user_authenticate(db, user)

    if token is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="credentials not found")

    return token


@app.get("/api/workflows/", response_model=List[schemas.WorkflowDto], status_code=status.HTTP_200_OK)
def read_workflows(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    workflows = crud.get_workflows(db, skip=skip, limit=limit)
    responses = []
    for wf in workflows:
        responses.append(schemas.model_to_schema(wf))
    return responses


@app.get("/api/workflows/{workflow_id}", response_model=schemas.WorkflowDto, status_code=status.HTTP_200_OK)
def read_user(workflow_id: int, db: Session = Depends(get_db)):
    model = crud.get_workflow(db, workflow_id=workflow_id)
    if model is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workflow not found")
    return schemas.model_to_schema(model)


@app.post("/api/workflows/", response_model=schemas.WorkflowDto, status_code=status.HTTP_201_CREATED)
def create_user(workflow: schemas.WorkflowDto, db: Session = Depends(get_db)):
    created = crud.create_workflow(db=db, workflow=workflow)
    return schemas.model_to_schema(created)
