from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps.auth import get_current_active_user
from app.models.client import Client
from app.models.program import Program, ProgramStatus
from app.schemas.client_portal import ProgramPropose, ConsentSign
from app.models.terms import TermsAndConditions
from app.models.consent import ClientConsentLog

router = APIRouter()


@router.post("/propose")
def propose_program(
    proposal: ProgramPropose,
    db: Session = Depends(get_db),
    current_user: Client = Depends(get_current_active_user),
):
    program = Program(
        client_id=current_user.id,
        catalog_item_id=proposal.catalog_item_id,
        proposed_budget=proposal.proposed_budget,
        proposed_start_date=proposal.proposed_start_date,
        proposed_end_date=proposal.proposed_end_date,
        status=ProgramStatus.SUBMITTED,
    )
    db.add(program)
    db.commit()
    db.refresh(program)
    return program


@router.get("/my-programs")
def my_programs(
    db: Session = Depends(get_db),
    current_user: Client = Depends(get_current_active_user),
):
    programs = db.query(Program).filter(Program.client_id == current_user.id).all()
    return programs


@router.get("/terms/active")
def get_active_terms(
    db: Session = Depends(get_db),
    current_user: Client = Depends(get_current_active_user),
):
    terms = db.query(TermsAndConditions).filter(TermsAndConditions.is_active == True).first()
    if not terms:
        raise HTTPException(status_code=404, detail="No active terms and conditions found")
    return terms


@router.post("/consent/sign")
def sign_consent(
    consent: ConsentSign,
    request: Request,
    db: Session = Depends(get_db),
    current_user: Client = Depends(get_current_active_user),
):
    terms = db.query(TermsAndConditions).filter(TermsAndConditions.id == consent.terms_and_conditions_id).first()
    if not terms:
        raise HTTPException(status_code=404, detail="Terms and conditions not found")
    
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    
    consent_log = ClientConsentLog(
        client_id=current_user.id,
        terms_and_conditions_id=consent.terms_and_conditions_id,
        program_id=consent.program_id,
        signature_data=consent.signature_data,
        passport_verification=consent.passport_verification,
        ip_address=ip_address,
        user_agent=user_agent,
    )
    db.add(consent_log)
    db.commit()
    db.refresh(consent_log)
    return consent_log
