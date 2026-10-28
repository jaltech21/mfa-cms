from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.program import Program, ProgramStatus
from app.api.deps.auth import require_ops
from app.models.client import Client

router = APIRouter()


@router.get("/")
def list_applications(
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
    skip: int = 0,
    limit: int = 100,
    status: str = None,
):
    query = db.query(Program)
    if status:
        query = query.filter(Program.status == status)
    applications = query.offset(skip).limit(limit).all()
    return applications


@router.get("/{application_id}")
def get_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
):
    app = db.query(Program).filter(Program.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app


@router.put("/{application_id}/status")
def update_application_status(
    application_id: int,
    new_status: ProgramStatus,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
    notes: str = None,
):
    app = db.query(Program).filter(Program.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app.status = new_status
    if notes:
        app.internal_notes = notes
    db.commit()
    db.refresh(app)
    return app
