from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.client import Client
from app.api.deps.auth import require_ops
from app.schemas.auth import UserResponse

router = APIRouter()


@router.get("/", response_model=List[UserResponse])
def list_clients(
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
    skip: int = 0,
    limit: int = 100,
):
    clients = db.query(Client).offset(skip).limit(limit).all()
    return clients


@router.get("/{client_id}", response_model=UserResponse)
def get_client(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
):
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client
