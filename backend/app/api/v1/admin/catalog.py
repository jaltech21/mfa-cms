from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.visa_catalog import VisaProcessingCatalog
from app.api.deps.auth import require_ops, require_super_admin
from app.schemas.catalog import CatalogCreate, CatalogUpdate, CatalogResponse
from app.models.client import Client

router = APIRouter()


@router.get("/", response_model=List[CatalogResponse])
def list_catalog(
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
    skip: int = 0,
    limit: int = 100,
):
    items = db.query(VisaProcessingCatalog).offset(skip).limit(limit).all()
    return items


@router.post("/", response_model=CatalogResponse)
def create_catalog_item(
    item_in: CatalogCreate,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
):
    item = VisaProcessingCatalog(**item_in.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/{item_id}", response_model=CatalogResponse)
def get_catalog_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
):
    item = db.query(VisaProcessingCatalog).filter(VisaProcessingCatalog.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Catalog item not found")
    return item


@router.put("/{item_id}", response_model=CatalogResponse)
def update_catalog_item(
    item_id: int,
    item_in: CatalogUpdate,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
):
    item = db.query(VisaProcessingCatalog).filter(VisaProcessingCatalog.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Catalog item not found")
    for field, value in item_in.dict(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_catalog_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_super_admin),
):
    item = db.query(VisaProcessingCatalog).filter(VisaProcessingCatalog.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Catalog item not found")
    db.delete(item)
    db.commit()
    return {"message": "Catalog item deleted"}
