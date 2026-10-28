from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps.auth import get_current_active_user
from app.db.session import get_db
from app.models.client import Client
from app.models.program import Program


def require_initiated(program_id: int, db: Session = Depends(get_db), current_user: Client = Depends(get_current_active_user)):
    program = db.query(Program).filter(Program.id == program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    if program.client_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this program")
    if not program.is_initiated:
        raise HTTPException(
            status_code=403,
            detail="Program not yet initiated. Access to tracking is restricted until initiation by operations team."
        )
    return program
