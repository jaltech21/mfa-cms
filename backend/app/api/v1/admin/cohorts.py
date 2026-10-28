from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.cohort import Cohort
from app.models.program import Program
from app.api.deps.auth import require_ops
from app.schemas.cohort import CohortCreate, CohortUpdate, CohortResponse
from app.models.client import Client

router = APIRouter()


@router.get("/", response_model=List[CohortResponse])
def list_cohorts(
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
    skip: int = 0,
    limit: int = 100,
):
    cohorts = db.query(Cohort).offset(skip).limit(limit).all()
    return cohorts


@router.post("/", response_model=CohortResponse)
def create_cohort(
    cohort_in: CohortCreate,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
):
    cohort = Cohort(**cohort_in.dict())
    db.add(cohort)
    db.commit()
    db.refresh(cohort)
    return cohort


@router.get("/{cohort_id}", response_model=CohortResponse)
def get_cohort(
    cohort_id: int,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
):
    cohort = db.query(Cohort).filter(Cohort.id == cohort_id).first()
    if not cohort:
        raise HTTPException(status_code=404, detail="Cohort not found")
    return cohort


@router.put("/{cohort_id}", response_model=CohortResponse)
def update_cohort(
    cohort_id: int,
    cohort_in: CohortUpdate,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
):
    cohort = db.query(Cohort).filter(Cohort.id == cohort_id).first()
    if not cohort:
        raise HTTPException(status_code=404, detail="Cohort not found")
    for field, value in cohort_in.dict(exclude_unset=True).items():
        setattr(cohort, field, value)
    db.commit()
    db.refresh(cohort)
    return cohort


@router.post("/{cohort_id}/assign/{program_id}")
def assign_to_cohort(
    cohort_id: int,
    program_id: int,
    db: Session = Depends(get_db),
    current_user: Client = Depends(require_ops),
):
    cohort = db.query(Cohort).filter(Cohort.id == cohort_id).first()
    if not cohort:
        raise HTTPException(status_code=404, detail="Cohort not found")
    program = db.query(Program).filter(Program.id == program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    program.cohort_id = cohort_id
    db.commit()
    return {"message": "Program assigned to cohort"}
