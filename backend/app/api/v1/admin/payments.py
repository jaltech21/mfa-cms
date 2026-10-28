from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.payment import Payment
from app.api.deps.auth import require_ops
from app.models.client import Client

router = APIRouter()


@router.get("/")
def list_payments(
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
    skip: int = 0,
    limit: int = 100,
):
    payments = db.query(Payment).offset(skip).limit(limit).all()
    return payments


@router.post("/")
def create_payment(
    payment_data: dict,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
):
    payment = Payment(**payment_data, recorded_by_id=current_user.id)
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment


@router.put("/{payment_id}/initiate/{program_id}")
def initiate_program(
    payment_id: int,
    program_id: int,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
):
    from app.models.program import Program
    from datetime import date
    
    program = db.query(Program).filter(Program.id == program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    program.is_initiated = True
    program.initiated_at = date.today()
    program.initiated_by_id = current_user.id
    db.commit()
    db.refresh(program)
    return {"message": "Program initiated", "program": program}
