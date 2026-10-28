from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.visa_catalog import VisaProcessingCatalog
from app.api.deps.auth import get_current_active_user
from app.models.client import Client

router = APIRouter()


@router.get("/")
def list_public_catalog(
    db: Session = Depends(get_db),
    current_user: Client = Depends(get_current_active_user),
):
    items = db.query(VisaProcessingCatalog).filter(VisaProcessingCatalog.is_active == True).all()
    return items
