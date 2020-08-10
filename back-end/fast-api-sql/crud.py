from sqlalchemy.orm import Session

from . import models, schemas


def hash_password(password: str):
    return password + "notreallyhashed"


def user_authenticate(db: Session, credentials: schemas.Login):
    user = db.query(models.User).filter(models.User.email == credentials.username).first()

    if user is None:
        return None

    if user.hashed_password == hash_password(credentials.password):
        token = schemas.SessionToken(id=user.id, username=user.name, token="token", grant_type="admin")
        return token

    return None


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = hash_password(user.password)
    db_user = models.User(email=user.email, name=user.name, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_workflow(db: Session, workflow_id: int):
    workflow = db.query(models.WorkFlow).filter(models.WorkFlow.id == workflow_id).first()
    if workflow is not None:
        db.delete(workflow)
    return workflow == db.deleted


def get_workflow(db: Session, workflow_id: int):
    return db.query(models.WorkFlow).filter(models.WorkFlow.id == workflow_id).first()


def get_workflows(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.WorkFlow).offset(skip).limit(limit).all()


def create_workflow(db: Session, workflow: schemas.WorkflowDto):
    model = schemas.schema_to_model(workflow)
    db.add(model)
    db.commit()
    db.refresh(model)
    return model
