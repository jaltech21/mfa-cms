from datetime import datetime, timedelta
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core import security
from app.core.config import settings
from app.db.session import get_db
from app.models.client import Client, UserRole
from app.schemas.auth import Token, UserRegister, UserResponse
from app.api.deps.auth import get_current_active_user
from app.services.email import send_password_reset_email

router = APIRouter()


@router.post("/register", response_model=UserResponse)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    user = db.query(Client).filter(Client.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    user = Client(
        email=user_in.email,
        password_hash=security.get_password_hash(user_in.password),
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        phone=user_in.phone,
        nationality=user_in.nationality,
        role=UserRole.CLIENT,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.query(Client).filter(Client.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        user.id, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: Client = Depends(get_current_active_user)):
    return current_user


@router.post("/forgot-password")
def forgot_password(request: dict, db: Session = Depends(get_db)):
    email = request.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    
    user = db.query(Client).filter(Client.email == email).first()
    if not user or not user.is_active:
        # Always return success to avoid email enumeration
        return {"message": "If the email exists, a password reset link has been sent."}
    
    reset_token = str(uuid4())
    user.reset_token = reset_token
    user.reset_token_expires = datetime.utcnow() + timedelta(hours=1)
    db.commit()
    db.refresh(user)
    
    sent = send_password_reset_email(user.email, reset_token)
    if not sent:
        # Email not configured - log token for development
        print(f"Password reset token for {user.email}: {reset_token}")
    
    return {"message": "If the email exists, a password reset link has been sent."}


@router.post("/reset-password")
def reset_password(request: dict, db: Session = Depends(get_db)):
    token = request.get("token")
    new_password = request.get("new_password")
    
    if not token or not new_password:
        raise HTTPException(status_code=400, detail="Token and new password are required")
    
    user = db.query(Client).filter(Client.reset_token == token).first()
    if not user or not user.reset_token_expires or user.reset_token_expires < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    user.password_hash = security.get_password_hash(new_password)
    user.reset_token = None
    user.reset_token_expires = None
    db.commit()
    
    return {"message": "Password has been reset successfully."}
