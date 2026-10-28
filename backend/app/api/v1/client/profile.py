from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps.auth import get_current_active_user
from app.models.client import Client
from app.schemas.client_portal import ClientProfileUpdate

router = APIRouter()


@router.get("/me")
def get_profile(current_user: Client = Depends(get_current_active_user)):
    return current_user


@router.put("/me")
def update_profile(
    profile_in: ClientProfileUpdate,
    db: Session = Depends(get_db),
    current_user: Client = Depends(get_current_active_user),
):
    for field, value in profile_in.dict(exclude_unset=True).items():
        setattr(current_user, field, value)
    db.commit()
    db.refresh(current_user)
    return current_user
